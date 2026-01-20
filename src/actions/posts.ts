"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/storage"; // Asumsi function ini ada
import { z } from "zod";
import { Prisma } from "@prisma/client";

// --- 1. DEFINISI SCHEMA VALIDASI (ZOD) ---
// Validasi di level aplikasi sebelum menyentuh logic database
const PostSchema = z.object({
  title: z.string().min(5, "Title minimal 5 karakter"),
  content: z.string().min(10, "Content minimal 10 karakter"),
  categoryId: z.string().uuid("Invalid Category ID"),
  published: z.boolean().optional(),
  date: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : new Date())),
});

// Helper untuk parsing FormData ke Object
const parseFormData = (formData: FormData) => {
  return {
    title: formData.get("title"),
    content: formData.get("content"),
    categoryId: formData.get("categoryId"),
    published: formData.get("published") === "on",
    date: formData.get("date"),
  };
};

// --- 2. CREATE ACTION ---
export async function createPost(formData: FormData) {
  // A. Authentication Check (CRITICAL)
  // TODO: Ganti ini dengan Real Auth (NextAuth / Supabase Auth)
  // const session = await auth();
  // if (!session?.user) throw new Error("Unauthorized");
  const authorId = "uuid-admin-yang-valid"; // Placeholder sementara

  // B. Input Validation
  const rawData = parseFormData(formData);
  const validation = PostSchema.safeParse(rawData);

  if (!validation.success) {
    // Return error ke UI (bisa disesuaikan dengan state management frontend)
    console.error("Validation Error:", validation.error.flatten());
    throw new Error("Input tidak valid");
  }

  const { title, content, categoryId, published, date } = validation.data;
  const imageFile = formData.get("image") as File;

  // Logic Slug (bisa dipisah jadi util)
  const slug =
    title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") +
    "-" +
    Date.now();

  let uploadedImageUrl: string | null = null;

  try {
    // C. Upload Process
    if (imageFile && imageFile.size > 0) {
      uploadedImageUrl = await uploadImage(imageFile);
    }

    // D. Database Transaction
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        published,
        categoryId, // Pastikan relasi di schema prisma menggunakan foreign key ini
        authorId,
        image: uploadedImageUrl,
        createdAt: date,
      },
    });
  } catch (error) {
    console.error("❌ Failed to create post:", error);

    // E. Compensation Logic (Rollback Manual)
    // Jika DB gagal, hapus gambar yang terlanjur diupload agar tidak jadi sampah
    if (uploadedImageUrl) {
      await deleteImage(uploadedImageUrl).catch((err) =>
        console.error("⚠️ Failed to cleanup orphaned image:", err),
      );
    }

    throw new Error("Gagal menyimpan data ke database.");
  }

  revalidatePath("/admin/posts");
}

// --- 3. UPDATE ACTION ---
export async function updatePost(id: string, formData: FormData) {
  // A. Cek Eksistensi Data
  const existingPost = await prisma.post.findUnique({ where: { id } });
  if (!existingPost) throw new Error("Post not found");

  // B. Validation
  const rawData = parseFormData(formData);
  const validation = PostSchema.safeParse(rawData);

  if (!validation.success) {
    throw new Error("Input tidak valid");
  }

  const { title, content, categoryId, published, date } = validation.data;
  const imageFile = formData.get("image") as File;

  // Siapkan object update dengan Type Safety Prisma
  const dataToUpdate: Prisma.PostUpdateInput = {
    title,
    content,
    published,
    category: { connect: { id: categoryId } }, // Cara eksplisit relasi Prisma
    createdAt: date, // Zod sudah handle logic tanggalnya
  };

  let newImageUrl: string | null = null;

  try {
    // C. Handle Image Logic
    if (imageFile && imageFile.size > 0) {
      newImageUrl = await uploadImage(imageFile);
      dataToUpdate.image = newImageUrl;
    }

    // D. Database Update
    await prisma.post.update({
      where: { id },
      data: dataToUpdate,
    });

    // E. Cleanup Image Lama (Hanya jika sukses update DB & ada gambar baru)
    if (newImageUrl && existingPost.image) {
      await deleteImage(existingPost.image).catch((err) =>
        console.error("⚠️ Failed to delete old image:", err),
      );
    }
  } catch (error) {
    console.error("❌ Update failed:", error);

    // F. Rollback Image Baru (Jika DB gagal update)
    if (newImageUrl) {
      await deleteImage(newImageUrl).catch((err) =>
        console.error("⚠️ Failed to cleanup new image during rollback:", err),
      );
    }
    throw error;
  }

  revalidatePath("/admin/posts");
}

export async function deletePost(id: string) {
  // Best practice: Hapus gambar di storage dulu atau setelah DB?
  // Lebih aman hapus record DB dulu, ambil URL-nya, baru hapus storage.
  // Atau gunakan Soft Delete (flag deletedAt).

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return;

  try {
    await prisma.post.delete({ where: { id } });

    // Hapus gambar jika ada
    if (post.image) {
      await deleteImage(post.image).catch(console.error);
    }

    revalidatePath("/admin/posts");
  } catch (error) {
    throw new Error("Gagal menghapus post");
  }

}


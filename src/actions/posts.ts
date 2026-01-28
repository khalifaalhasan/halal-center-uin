"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/storage";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";

// --- TIPE RESPONSE UNTUK FRONTEND ---
export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

// --- SCHEMA VALIDASI ---
const PostSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  content: z.string().min(10, "Konten minimal 10 karakter (terlalu pendek)"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  published: z.boolean().optional(),
  date: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : new Date())),
});

const parseFormData = (formData: FormData) => {
  return {
    title: formData.get("title"),
    content: formData.get("content"),
    categoryId: formData.get("categoryId"),
    published: formData.get("published") === "on",
    date: formData.get("date"),
  };
};

// --- CREATE ACTION ---
export async function createPost(formData: FormData): Promise<ActionResponse> {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return { success: false, message: "Unauthorized: Harap login dahulu." };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return { success: false, message: "User tidak ditemukan." };
  }

  // VALIDASI INPUT
  const rawData = parseFormData(formData);
  const validation = PostSchema.safeParse(rawData);

  // --- MODIFIKASI: RETURN ERROR ZOD ---
  if (!validation.success) {
    return {
      success: false,
      message: "Terdapat kesalahan pada input data.",
      errors: validation.error.flatten().fieldErrors, // 👈 Ini kuncinya
    };
  }

  const { title, content, categoryId, published, date } = validation.data;
  const imageFile = formData.get("image") as File;
  const slug =
    title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") +
    "-" +
    Date.now();

  let uploadedImageUrl: string | null = null;

  try {
    if (imageFile && imageFile.size > 0) {
      uploadedImageUrl = await uploadImage(imageFile);
    }

    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        published,
        categoryId,
        authorId: user.id,
        image: uploadedImageUrl,
        createdAt: date,
      },
    });

    revalidatePath("/admin/posts");
    return { success: true, message: "Berita berhasil dibuat!" };
  } catch (error) {
    console.error("❌ Failed to create post:", error);
    if (uploadedImageUrl)
      await deleteImage(uploadedImageUrl).catch(console.error);
    return { success: false, message: "Gagal menyimpan ke database." };
  }
}

// --- UPDATE ACTION ---
export async function updatePost(
  id: string,
  formData: FormData,
): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { success: false, message: "Unauthorized" };

  const existingPost = await prisma.post.findUnique({ where: { id } });
  if (!existingPost) return { success: false, message: "Post not found" };

  const rawData = parseFormData(formData);
  const validation = PostSchema.safeParse(rawData);

  // --- MODIFIKASI: RETURN ERROR ZOD ---
  if (!validation.success) {
    return {
      success: false,
      message: "Terdapat kesalahan pada input data.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { title, content, categoryId, published, date } = validation.data;
  const imageFile = formData.get("image") as File;

  const dataToUpdate: Prisma.PostUpdateInput = {
    title,
    content,
    published,
    category: { connect: { id: categoryId } },
    createdAt: date,
  };

  let newImageUrl: string | null = null;

  try {
    if (imageFile && imageFile.size > 0) {
      newImageUrl = await uploadImage(imageFile);
      dataToUpdate.image = newImageUrl;
    }

    await prisma.post.update({
      where: { id },
      data: dataToUpdate,
    });

    if (newImageUrl && existingPost.image) {
      await deleteImage(existingPost.image).catch(console.error);
    }

    revalidatePath("/admin/posts");
    return { success: true, message: "Berita berhasil diperbarui!" };
  } catch (error) {
    console.error("❌ Update failed:", error);
    return { success: false, message: "Gagal mengupdate data." };
  }
}

// --- 4. DELETE ACTION ---
export async function deletePost(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return;

  try {
    await prisma.post.delete({ where: { id } });
    if (post.image) await deleteImage(post.image).catch(console.error);
    revalidatePath("/admin/posts");
  } catch (error) {
    throw new Error("Gagal menghapus post");
  }
}

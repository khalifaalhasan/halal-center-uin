"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/storage";

// 1. CREATE Action
export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const published = formData.get("published") === "on";

  // --- [BARU: Ambil Tanggal Manual] ---
  const dateStr = formData.get("date") as string;
  // Jika user isi tanggal, pakai itu. Jika kosong, pakai Now().
  const createdAt = dateStr ? new Date(dateStr) : new Date();
  // ------------------------------------

  const imageFile = formData.get("image") as File;
  let imageUrl = null;

  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadImage(imageFile);
    } catch (error) {
      console.error("❌ ERROR UPLOAD MINIO:", error);
      throw new Error("Gagal upload gambar: " + (error as Error).message);
    }
  }

  const slug =
    title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") +
    "-" +
    Date.now();

  // Cari Author (sama seperti sebelumnya)
  let author = await prisma.user.findFirst();
  if (!author) {
    author = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@uin.ac.id",
        password: "password_dummy",
        role: "ADMIN",
      },
    });
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      published,
      categoryId,
      authorId: author.id,
      image: imageUrl,
      createdAt: createdAt, // ✅ Simpan Tanggal Custom
    },
  });

  revalidatePath("/admin/posts");
}

// 2. UPDATE Action
export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const published = formData.get("published") === "on";

  // --- [BARU: Ambil Tanggal Manual] ---
  const dateStr = formData.get("date") as string;
  // ------------------------------------

  const imageFile = formData.get("image") as File;

  const dataToUpdate: any = {
    title,
    content,
    published,
    categoryId,
  };

  // Cek apakah ada update tanggal?
  if (dateStr) {
    dataToUpdate.createdAt = new Date(dateStr); // ✅ Update tanggal jika diisi
  }

  if (imageFile && imageFile.size > 0) {
    try {
      const imageUrl = await uploadImage(imageFile);
      dataToUpdate.image = imageUrl;
    } catch (error) {
      console.error("❌ ERROR UPLOAD MINIO:", error);
      throw new Error("Gagal update gambar: " + (error as Error).message);
    }
  }

  await prisma.post.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin/posts");
}

// deletePost tetap sama...
export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
}

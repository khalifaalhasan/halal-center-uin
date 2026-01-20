"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. CREATE
export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;

  // Bikin slug otomatis: "Gaya Hidup" -> "gaya-hidup"
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  await prisma.category.create({
    data: {
      name,
      slug,
    },
  });

  revalidatePath("/admin/categories");
}

// 2. UPDATE
export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string;

  // Kita update slug juga biar sinkron
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  await prisma.category.update({
    where: { id },
    data: {
      name,
      slug,
    },
  });

  revalidatePath("/admin/categories");
}

// 3. DELETE
export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
  } catch (error) {
    throw new Error(
      "Gagal menghapus kategori. Pastikan tidak ada berita yang menggunakan kategori ini.",
    );
  }
}

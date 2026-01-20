"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/storage"; // 👈 Pastikan import ini ada

// 1. CREATE
export async function createTeamMember(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const parentId = formData.get("parentId") as string;

  // Ambil File dari form
  const imageFile = formData.get("image") as File;
  let imageUrl = null;

  // LOGIC UPLOAD GAMBAR
  if (imageFile && imageFile.size > 0) {
    try {
      // Upload ke MinIO dan dapatkan URL-nya
      imageUrl = await uploadImage(imageFile);
    } catch (error) {
      console.error("Gagal upload:", error);
      throw new Error("Gagal mengupload gambar. Cek koneksi MinIO.");
    }
  }

  await prisma.teamMember.create({
    data: {
      name,
      role,
      image: imageUrl, // Simpan URL gambar ke database
      parentId: parentId && parentId !== "root" ? parentId : null,
      order: 0,
    },
  });

  revalidatePath("/admin/organization");
  revalidatePath("/struktur-organisasi");
}

// 2. UPDATE
export async function updateTeamMember(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const parentId = formData.get("parentId") as string;

  const imageFile = formData.get("image") as File;

  const dataToUpdate: any = {
    name,
    role,
    parentId: parentId && parentId !== "root" ? parentId : null,
  };

  if (dataToUpdate.parentId === id) {
    throw new Error("Tidak bisa memilih diri sendiri sebagai atasan.");
  }

  // LOGIC UPLOAD (Hanya jika ada file baru)
  if (imageFile && imageFile.size > 0) {
    try {
      // 1. (Opsional) Hapus gambar lama dulu biar hemat storage
      const oldData = await prisma.teamMember.findUnique({
        where: { id },
        select: { image: true },
      });
      if (oldData?.image) {
        await deleteImage(oldData.image);
      }

      // 2. Upload gambar baru
      const imageUrl = await uploadImage(imageFile);
      dataToUpdate.image = imageUrl;
    } catch (error) {
      console.error("Gagal update gambar:", error);
      throw new Error("Gagal update gambar.");
    }
  }

  await prisma.teamMember.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin/organization");
  revalidatePath("/struktur-organisasi");
}

// 3. DELETE
export async function deleteTeamMember(id: string) {
  // Alih-alih .delete(), kita update deletedAt
  await prisma.teamMember.update({
    where: { id },
    data: { deletedAt: new Date() }, // Tandai dihapus sekarang
  });

  // Note: Anak-anaknya (children) akan tetap punya parentId ke ID ini,
  // tapi karena Parent-nya terfilter di Service,
  // mereka akan otomatis naik jadi Root atau hilang dari Tree (tergantung logic buildTree).
  // Agar rapi, biasanya anak-anaknya kita biarkan saja (hidden parent)
  // atau logic service harus menangani "orphaned nodes".
  // Untuk simpelnya, saat parent di-restore, struktur balik lagi.

  revalidatePath("/admin/organization");
  revalidatePath("/struktur-organisasi");
}

// 4. RESTORE / UNDO (Fitur Baru)
export async function restoreTeamMember(id: string) {
  await prisma.teamMember.update({
    where: { id },
    data: { deletedAt: null }, // Hapus tanda deletedAt
  });

  revalidatePath("/admin/organization");
  revalidatePath("/struktur-organisasi");
}

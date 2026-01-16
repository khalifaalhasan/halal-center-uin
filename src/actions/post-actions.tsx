"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postSchema } from "@/lib/validations/posts";
import { createPost, deletePost, updatePost } from "@/services/post-service";

// Tipe respons standar untuk action
type ActionState = {
  error?: string;
  success?: boolean;
};

// --- CREATE ACTION ---
export async function createPostAction(formData: FormData): Promise<ActionState> {
  // 1. Parse dan Validasi Data
  // Catatan: Karena kita belum bikin frontend, asumsi data dikirim sbg JSON object via bind
  // atau kita ambil dari FormData manual.
  // Untuk Clean Code, sebaiknya form di frontend sudah mengirim data matang.
  
  const rawData = Object.fromEntries(formData.entries());
  
  // Konversi checkbox/boolean dan number jika perlu
  const parsedData = postSchema.safeParse({
    ...rawData,
    published: rawData.published === "on" || rawData.published === "true",
  });

  if (!parsedData.success) {
    return { error: "Data tidak valid. Periksa inputan anda." };
  }

  try {
    // TODO: Ganti ini dengan Session User ID asli (Auth.js / NextAuth)
    // Karena di schema User wajib, kita hardcode dulu ID dummy untuk testing backend
    // Nanti kita akan bahas Auth terpisah.
    const dummyAuthorId = "user_123_placeholder"; 

    await createPost(parsedData.data, dummyAuthorId);
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Gagal membuat postingan." };
  }

  // 2. Revalidate Cache (Update tampilan frontend)
  revalidatePath("/admin/posts");
  
  // 3. Redirect pengguna
  redirect("/admin/posts");
}

// --- DELETE ACTION ---
export async function deletePostAction(id: string) {
  try {
    await deletePost(id);
    revalidatePath("/admin/posts");
    return { success: true };
  } catch (error) {
    return { error: "Gagal menghapus postingan." };
  }
}

// --- UPDATE ACTION ---
// (Struktur mirip Create, hanya memanggil updatePost)
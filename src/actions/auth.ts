// src/actions/auth.ts
'use server';

import { signIn } from "@/auth";

// DEFINISIKAN TIPE YANG JELAS UNTUK DIPAKAI BERSAMA
export type LoginFormState = {
  success: boolean;
  message: string;
};

export async function loginAction(
  prevState: LoginFormState | undefined, // Terima undefined untuk state awal
  formData: FormData
): Promise<LoginFormState | undefined> { // Return bisa undefined saat redirect
  
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    // HANDLING UNKNOWN ERROR
    if (error instanceof Error) {
      const type = (error as any).type;

      if (type === "CredentialsSignin") {
        return { success: false, message: "Email atau password salah." };
      }

      if (type === "CallbackRouteError") {
        return { success: false, message:"Gagal Login, Coba lagi."}
      }
    }
    // Wajib re-throw error agar redirect bekerja!
    throw error;
  }
  
  // Secara teknis unreachable karena redirect, tapi TS butuh return
  return { success: true, message: "Login berhasil" };
}

export async function logoutAction() {
  // Fix SignOut -> signOut (import dari auth.ts)
  // Perlu import { signOut } from "@/auth" di atas
}
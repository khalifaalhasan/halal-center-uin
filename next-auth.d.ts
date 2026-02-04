// src/types/next-auth.d.ts
import "next-auth";
import { type DefaultSession } from "next-auth";

// Kita definisikan Role manual biar aman
type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

declare module "next-auth" {
  /**
   * Update tipe User (yang dipakai di User object database)
   */
  interface User {
    role: UserRole;
  }

  /**
   * Update tipe Session (yang dipakai di useSession)
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"]; // Gunakan index access untuk ambil tipe user default
  }
}

declare module "next-auth/jwt" {
  /**
   * Update tipe JWT
   */
  interface JWT {
    role: UserRole;
    id: string;
  }
}
// src/middleware.ts
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"


const NextAuthBypass = NextAuth as any; 
// Inisialisasi NextAuth dengan config ringan
const { auth } = NextAuthBypass(authConfig)

// Export sebagai middleware
export default auth

// Konfigurasi Matcher (Penting!)
// Agar middleware tidak jalan di file statis, gambar, atau API public
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
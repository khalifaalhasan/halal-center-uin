import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = (NextAuth as any)(authConfig);

export default auth((req: any) => {
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;
  const role = user?.role;
  const pathname = req.nextUrl.pathname;

  // --- DEBUGGING (Cek Terminal VS Code saat akses) ---
  console.log(
    `[MIDDLEWARE] Path: ${pathname} | User: ${user?.email} | Role: ${role}`,
  );

  // 1. Redirect Login -> Dashboard
  if (pathname.startsWith("/login") && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  // 2. Proteksi Folder Admin
  if (pathname.startsWith("/admin")) {
    // A. Belum Login? Tendang.
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // B. Role USER? Tendang ke Home.
    if (role === "USER") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    // C. KHUSUS MENU USERS (Biang Keroknya di sini)
    if (pathname.startsWith("/admin/users")) {
      // Kita cek EKSPLISIT: Kalau BUKAN Super Admin, tolak!
      if (role !== "SUPER_ADMIN") {
        console.log(
          `[BLOCKED] User ${user?.email} mencoba akses menu Super Admin!`,
        );
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login"],
};

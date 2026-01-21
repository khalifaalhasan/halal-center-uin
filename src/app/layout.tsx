import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import branding from "@/constants/branding.json";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lembaga Pemeriksa Halal",
  description:
    "Lembaga resmi pemeriksa kehalalan produk untuk mendukung ekosistem sertifikasi halal di Indonesia, khususnya di wilayah Sumatera Selatan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader
          color="#4f46e5" /* Warna Primary (Indigo-600) sesuai tema kamu */
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true} /* Tampilkan Spinner di pojok kanan atas */
          easing="ease"
          speed={200}
          shadow="0 0 10px #4f46e5,0 0 5px #4f46e5"
          zIndex={1600}
        />
        {children}
      </body>
    </html>
  );
}

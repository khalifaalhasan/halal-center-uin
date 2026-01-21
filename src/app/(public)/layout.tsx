
import { Navbar } from "@/components/layouts/navbar/navbar";
import { Footer } from "@/components/layouts/footer";
import { Metadata } from "next";



// Setup Base URL (PENTING untuk SEO Gambar)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  ? process.env.NEXT_PUBLIC_BASE_URL 
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  // Template Judul: "%s" akan diganti dengan judul di halaman anak
  title: {
    default: "Halal Center UIN Raden Fatah Palembang",
    template: "%s | Halal Center UIN Raden Fatah", 
  },
  description: "Lembaga Pemeriksa Halal terpercaya, profesional, dan akuntabel di Sumatera Selatan. Melayani sertifikasi halal untuk UMKM dan Perusahaan.",
  keywords: ["Halal Center", "Halal Center Raden Fatah", "Sertifikasi Halal Palembang", "Audit Halal", "LPPOM MUI Sumsel"],
  authors: [{ name: "Khalifa Al-Hasan Mahasiswa UIN Raden Fatah Palembang", url: baseUrl }],
  creator: "Halal Center UIN Raden Fatah",
  
  // Konfigurasi OpenGraph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: baseUrl,
    siteName: "Halal Center UIN Raden Fatah Palembang",
    title: "Halal Center UIN Raden Fatah Palembang",
    description: "Layanan pemeriksaan dan sertifikasi halal profesional.",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Gedung LPH UIN Raden Fatah",
      },
    ],
  },

  // Konfigurasi Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "LPH UIN Raden Fatah Palembang",
    description: "Layanan pemeriksaan dan sertifikasi halal profesional.",
    images: ["/og-image.jpg"],
  },

  // Konfigurasi Robots (Default: Boleh di-index)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

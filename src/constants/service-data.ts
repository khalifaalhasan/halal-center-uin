// src/constants/services-data.ts

import {
  Utensils,
  Coffee,
  Package,
  Truck,
  Sparkles,
  Beef,
} from "lucide-react";

// --- 1. DATA PERSYARATAN DOKUMEN ---
export const REGULER_REQUIREMENTS = [
  {
    id: 1,
    doc: "Surat Permohonan Sertifikat Halal",
    desc: "Generate secara otomatis di SIHalal",
    type: "generate",
  },
  {
    id: 2,
    doc: "Formulir Pendaftaran Jasa Penyembelihan",
    desc: "Diunggah di SIHalal (Jika ada)",
    type: "upload",
  },
  {
    id: 3,
    doc: "Aspek Legal: NIB",
    desc: "Diunggah di SIHalal pada saat membuat akun",
    type: "upload",
  },
  {
    id: 4,
    doc: "Dokumen Penyelia Halal",
    details: [
      "Penetapan Penyelia Halal (Generate otomatis)",
      "Salinan KTP (Upload)",
      "Daftar Riwayat Hidup (Generate otomatis)",
      "Sertifikat Pelatihan/Kompetensi (Upload)",
    ],
    desc: "Kombinasi upload dan generate sistem",
    type: "mixed",
  },
  {
    id: 5,
    doc: "Nama produk, Matriks Bahan & Daftar Bahan",
    desc: "Mengisi data di SIHalal",
    type: "input",
  },
  {
    id: 6,
    doc: "Proses Produksi Halal",
    desc: "Mengisi data di SIHalal",
    type: "input",
  },
  {
    id: 7,
    doc: "Manual SJPH",
    desc: "Mengisi/Upload (Akan di-Generate otomatis)",
    type: "mixed",
  },
  {
    id: 8,
    doc: "Sertifikat Pelatihan/Kompetensi Juleha",
    desc: "Diunggah di SIHalal",
    type: "upload",
  },
  {
    id: 9,
    doc: "Dokumen Tambahan Pelaku Usaha LN",
    desc: "Diunggah di SIHalal",
    type: "upload",
  },
];

// --- 2. DATA RUANG LINGKUP (6 ITEM) ---
export const SCOPES = [
  {
    icon: Utensils,
    title: "Makanan",
    description: "Produk olahan pangan siap saji maupun kemasan.",
    type: "modal",
  },
  {
    icon: Coffee,
    title: "Minuman",
    description: "Minuman olahan dan serbuk bebas khamr.",
    type: "modal",
  },
  {
    icon: Package,
    title: "Barang Gunaan",
    description: "Perlengkapan rumah tangga, sandang, dll.",
    type: "modal",
  },
  {
    icon: Truck,
    title: "Distribusi",
    description: "Jasa logistik, pergudangan, dan retail.",
    type: "modal",
  },
  {
    icon: Sparkles,
    title: "Kosmetik",
    description: "Produk kecantikan dan perawatan tubuh.",
    type: "modal",
  },
  {
    icon: Beef,
    title: "Rumah Potong Hewan",
    description: "Jasa penyembelihan (RPH/RPU).",
    type: "download",
    fileUrl: "/files/juknis-rph.pdf",
  },
];
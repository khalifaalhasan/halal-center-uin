"use client";

import branding from "@/constants/branding.json";
import { motion } from "framer-motion"; // 1. Import motion

// 2. Definisi Varian Animasi (Fade In Up)
// Kita buat di luar component agar tidak di-recreate setiap render
const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 40, // Mulai dari posisi 40px lebih bawah
  },
  visible: (delayIndex: number) => ({
    // Menerima custom delay
    opacity: 1,
    y: 0, // Kembali ke posisi asli
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const, // Easing yang smooth (cubic-bezier)
      delay: delayIndex * 0.2, // Delay bertingkat (stagger effect)
    },
  }),
};

export default function HeroSection() {
  // Konfigurasi viewport yang bisa dipakai berulang
  // once: false -> KUNCI agar animasi mengulang saat scroll balik
  // amount: 0.5 -> Animasi mulai saat 50% elemen terlihat di layar
  const viewportConfig = { once: false, amount: 0.5 };

  return (
    <section className="relative pt-28 pb-10 lg:pt-36 lg:pb-14 overflow-hidden bg-white">
      {/* Background Dot Pattern (Tidak perlu dianimasi scroll) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(#6366f1 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge Branding 
          - Mengubah div menjadi motion.div
          - Menghapus class 'animate-fade-in-up' bawaan CSS
        */}
        <motion.div
          initial="hidden"
          whileInView="visible" // Memicu animasi saat masuk viewport
          viewport={viewportConfig}
          custom={0} // Urutan delay ke-0 (muncul duluan)
          variants={fadeInUpVariants}
          className="inline-flex items-center gap-2 bg-secondary-purple/30 border border-primary/20 px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-6"
        >
          <span className="relative flex h-2 w-2">
            {/* animate-ping CSS biarkan saja, karena ini looping terus menerus */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest">
            Sistem Informasi Resmi {branding.brand.shortName}
          </span>
        </motion.div>

        {/* Heading Utama 
          - Mengubah h1 menjadi motion.h1
        */}
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={1} // Urutan delay ke-1 (muncul setelah badge)
          variants={fadeInUpVariants}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto"
        >
          {branding.brand.name} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
            {branding.brand.secondary}
          </span>
        </motion.h1>

        {/* Sub-Heading 
          - Mengubah p menjadi motion.p
        */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={2} // Urutan delay ke-2 (muncul paling terakhir)
          variants={fadeInUpVariants}
          className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-2 px-4"
        >
          Kami hadir untuk memastikan produk Anda aman, suci, dan sesuai standar
          syariat. Pastikan memilih{" "}
          <strong className="text-slate-900 font-bold">
            {branding.brand.shortName}
          </strong>{" "}
          saat mendaftar.
        </motion.p>
      </div>

      {/* Efek Gradasi Bawah */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}

"use client"; // Wajib untuk Framer Motion

import { ButtonCustom } from "@/components/ui/button-custom";
import {
  ExternalLink,
  MousePointerClick,
  FileCheck,
  Building2,
  Info,
} from "lucide-react";
import branding from "@/constants/branding.json";
import { motion } from "framer-motion"; // 1. Import motion

// 2. Definisi Varian Animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay antar anak 0.2 detik
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function CtaSihalal() {
  return (
    <section className="pb-20 px-4 -mt-4 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Main Card Wrapper dengan Animasi Zoom In Halus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }} // Animasi ulang saat scroll
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-indigo-900 to-slate-900 text-white shadow-2xl ring-1 ring-white/20"
        >
          {/* Background Elements (Optional: Pulse Animation) */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"
          />

          {/* Content Wrapper dengan Stagger Animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="relative z-10 px-6 py-12 md:px-12 md:py-16 text-center"
          >
            {/* Header Text */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                Siap Mendaftar di{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                  PTSP Halal
                </span>
                ?
              </h2>
              <p className="text-purple-100/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Pendaftaran akun dan pengajuan sertifikasi dilakukan secara
                terpusat melalui website BPJPH.
              </p>
            </motion.div>

            {/* Steps Container */}
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-6 text-left mb-12"
            >
              {/* Step 1 */}
              <motion.div
                variants={itemVariants}
                className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MousePointerClick className="w-5 h-5 text-purple-200" />
                </div>
                <h3 className="font-bold text-lg mb-1">1. Buat Akun</h3>
                <p className="text-sm text-purple-100/60 leading-relaxed">
                  Kunjungi ptsp.halal.go.id dan registrasi sebagai Pelaku Usaha.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                variants={itemVariants}
                className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileCheck className="w-5 h-5 text-purple-200" />
                </div>
                <h3 className="font-bold text-lg mb-1">2. Input Data</h3>
                <p className="text-sm text-purple-100/60 leading-relaxed">
                  Lengkapi data usaha, penyelia halal, dan daftar produk Anda.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                variants={itemVariants}
                className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-purple-400/50 hover:bg-white/10 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              >
                <div className="absolute top-4 right-4 text-purple-300">
                  <Info size={16} className="opacity-50" />
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 w-10 h-10 rounded-lg flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1 text-white">
                  3. Pilih LPH
                </h3>
                <p className="text-sm text-purple-100/80 leading-relaxed">
                  Cari & pilih{" "}
                  <strong className="text-white font-bold tracking-wide border-b border-purple-400/50">
                    {branding.brand.shortName}
                  </strong>{" "}
                  saat diminta memilih lembaga.
                </p>
              </motion.div>
            </motion.div>

            {/* ACTION BUTTONS WRAPPER */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            >
              {/* 1. Tombol Utama (External) */}
              <ButtonCustom
                href="https://ptsp.halal.go.id"
                className="w-full sm:w-auto bg-primary text-white hover:bg-primary shadow-lg px-8 py-4"
              >
                Daftar Sekarang <ExternalLink size={18} />
              </ButtonCustom>

              {/* 2. Tombol Sekunder (Internal) */}
              <a
                href="#prosedur"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-purple-300/30 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Info size={18} />
                Lihat Prosedur
              </a>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-[10px] text-purple-200/50 uppercase tracking-widest"
            >
              *Link pendaftaran mengarah ke portal resmi BPJPH
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

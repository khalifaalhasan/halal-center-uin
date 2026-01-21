"use client"; // Wajib untuk Framer Motion

import { Target, ShieldCheck, Users2, Lightbulb, Globe2 } from "lucide-react";
import { SectionHeader } from "../ui/section-header";
import branding from "@/constants/branding.json";
import { motion } from "framer-motion"; // 1. Import Motion

export default function VisiMisiPage() {
  // Data Misi dengan Ikon Spesifik
  const misiData = [
    {
      icon: ShieldCheck,
      text: "Menyelenggarakan pemeriksaan halal yang akurat, transparan, dan akuntabel sesuai standar regulasi dan syariat Islam.",
    },
    {
      icon: Users2,
      text: "Mengembangkan kompetensi Sumber Daya Manusia auditor halal yang profesional, berintegritas, dan adaptif terhadap teknologi.",
    },
    {
      icon: Lightbulb,
      text: "Menjadi pusat literasi dan edukasi yang meningkatkan kesadaran halal bagi pelaku industri dan masyarakat luas.",
    },
    {
      icon: Globe2,
      text: "Berperan aktif secara strategis dalam penguatan ekosistem jaminan produk halal di tingkat nasional maupun global.",
    },
  ];

  // --- VARIAN ANIMASI ---

  // 1. Animasi untuk Banner Visi (Zoom In halus)
  const bannerVariant = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  // 2. Animasi Container Grid Misi (Orchestrator)
  const gridContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay antar item misi
      },
    },
  };

  // 3. Animasi Item Misi (Slide Up)
  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  // 4. Animasi Header & Divider
  const simpleFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="py-20">
      {/* Header Wrapper Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={simpleFadeUp}
      >
        <SectionHeader
          badge="Visi Misi"
          title={
            <>
              Visi & Misi{" "}
              <span className="text-primary">{branding.brand.name}</span>
            </>
          }
          subtitle="Landasan strategis dan tujuan kami dalam membangun ekosistem industri halal yang terpercaya."
        />
      </motion.div>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* --- SECTION VISI (Corporate Banner Style) --- */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#2c2f4e] to-indigo-900 p-8 md:p-12 shadow-xl ring-1 ring-white/10"
            variants={bannerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }} // Animasi ulang saat scroll
          >
            {/* Subtle Pattern Grid Background */}
            <div
              className="absolute inset-0 z-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <Target size={40} className="text-indigo-300" />
              </div>
              <div className="space-y-4">
                <h2 className="text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase">
                  Visi Organisasi
                </h2>
                <p className="text-xl md:text-3xl font-bold text-white leading-tight lg:leading-snug">
                  "Menjadi Lembaga Pemeriksa Halal yang Unggul, Terpercaya, dan
                  Berstandar Internasional dalam Mendukung Industri Halal
                  Global."
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- SECTION MISI (Strategic Grid Style) --- */}
          <div>
            {/* Divider Animation */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={simpleFadeUp}
            >
              <div className="h-px flex-1 bg-slate-200"></div>
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider text-center">
                Misi Strategis
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </motion.div>

            {/* Grid Misi dengan Staggered Animation */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={gridContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
            >
              {misiData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariant}
                    className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex items-start gap-5"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      {/* Menambahkan nomor urut kecil */}
                      <span className="block text-xs font-bold text-slate-400 mb-2">
                        0{index + 1}
                      </span>
                      <p className="text-base text-slate-700 leading-relaxed font-medium">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

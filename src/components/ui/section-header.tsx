"use client"; // Wajib untuk Framer Motion

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion"; // 1. Import Motion

interface SectionHeaderProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  linkHref?: string;
  linkText?: string;
  className?: string;
}

// 2. Definisi Varian Animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay antar elemen (Badge -> Title -> Subtitle)
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  linkHref,
  linkText = "Lihat Semua",
  className = "",
}: SectionHeaderProps) {
  // Logic: Apakah mode "Split" (Kiri-Kanan) atau "Center" (Tengah)
  const isSplitMode = !!linkHref;

  return (
    <motion.div
      className={`relative flex flex-col ${className}
        /* --- SPACING & COMPACTNESS --- */
        mb-8 md:mb-12           
        gap-3 md:gap-6          
        pt-8 md:pt-0            
        
        /* --- ALIGNMENT --- */
        items-center text-center 
        ${
          isSplitMode
            ? "md:flex-row md:items-end md:justify-between md:text-left"
            : "md:items-center md:text-center"
        }
      `}
      // 3. Pasang Animasi di Container Utama
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }} // Animasi ulang saat scroll
    >
      {/* 1. TEXT CONTAINER */}
      <div
        className={`w-full ${isSplitMode ? "max-w-2xl" : "max-w-3xl mx-auto"}`}
      >
        {/* Badge (Optional) */}
        {badge && (
          <motion.div
            variants={itemVariants}
            className={`inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold tracking-widest uppercase shadow-sm
            text-[10px] md:text-xs   
            mb-3 md:mb-4             
            `}
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-400" />
            {badge}
          </motion.div>
        )}

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2 md:mb-4"
        >
          {title}
        </motion.h2>

        {/* Subtitle (Optional) */}
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-xl md:max-w-none mx-auto md:mx-0"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* 2. ACTION BUTTON (Desktop Only & Optional) */}
      {linkHref && (
        <motion.div
          variants={itemVariants}
          className="hidden md:block flex-shrink-0 mb-1"
        >
          <Link
            href={linkHref}
            className="group flex items-center gap-2 font-bold text-slate-600 hover:text-primary transition-colors"
          >
            {linkText}
            <span className="bg-slate-200 p-1.5 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ArrowRight size={18} />
            </span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

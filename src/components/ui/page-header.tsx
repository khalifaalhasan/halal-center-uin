"use client"; // Wajib untuk Framer Motion

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion"; // 1. Import Motion

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

// 2. Definisi Varian Animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay berurutan: Breadcrumb -> Title -> Desc
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function PageHeader({
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    // REVISI PADDING: Tetap sesuai request
    <div className="relative bg-white border-b border-slate-100 overflow-hidden pt-24 pb-8 lg:pt-32 lg:pb-12">
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Grid Pattern (Static) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />

      {/* Orb effect (Animated Pulse) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-primary/5 blur-[80px] rounded-full pointer-events-none z-0"
      />

      {/* --- MAIN CONTENT CONTAINER --- */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }} // Animasi ulang saat scroll
      >
        {/* Breadcrumbs - Versi Mini & Compact */}
        {breadcrumbs && (
          <motion.div
            variants={fadeInUp}
            className="inline-flex justify-center mb-4"
          >
            <nav className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] md:text-xs font-medium text-slate-500 hover:bg-white hover:shadow-sm transition-all">
              <Link
                href="/"
                className="hover:text-primary transition-colors flex items-center"
              >
                <Home size={12} className="mr-1" />
                Home
              </Link>

              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <ChevronRight size={10} className="text-slate-300" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-primary font-bold">{item.label}</span>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

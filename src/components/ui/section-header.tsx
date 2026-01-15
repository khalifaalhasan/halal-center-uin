import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface SectionHeaderProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  linkHref?: string;
  linkText?: string;
  className?: string;
}

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
    <div
      className={`relative flex flex-col ${className}
        /* --- SPACING & COMPACTNESS --- */
        mb-8 md:mb-12           /* Margin bottom lebih kecil di mobile */
        gap-3 md:gap-6          /* Jarak antar elemen lebih rapat di mobile */
        pt-8 md:pt-0            /* PENTING: Turun dikit dari navbar khusus mobile */
        
        /* --- ALIGNMENT --- */
        items-center text-center /* Mobile default: Center */
        ${
          /* Desktop Logic */
          isSplitMode
            ? "md:flex-row md:items-end md:justify-between md:text-left"
            : "md:items-center md:text-center"
        }
      `}
    >
      {/* 1. TEXT CONTAINER */}
      <div
        className={`w-full ${isSplitMode ? "max-w-2xl" : "max-w-3xl mx-auto"}`}
      >
        {/* Badge */}
        {badge && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold tracking-widest uppercase shadow-sm
            text-[10px] md:text-xs   /* Font badge lebih kecil */
            mb-3 md:mb-4             /* Jarak badge ke judul lebih rapat */
            `}
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-400" />
            {badge}
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2 md:mb-4">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-xl md:max-w-none mx-auto md:mx-0">
            {subtitle}
          </p>
        )}
      </div>

      {/* 2. ACTION BUTTON (Desktop Only) */}
      {linkHref && (
        <div className="hidden md:block flex-shrink-0 mb-1">
          <Link
            href={linkHref}
            className="group flex items-center gap-2 font-bold text-slate-600 hover:text-primary transition-colors"
          >
            {linkText}
            <span className="bg-slate-200 p-1.5 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

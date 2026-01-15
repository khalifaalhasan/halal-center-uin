import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    // REVISI PADDING:
    // Mobile: pt-24 (96px) -> Pas di bawah navbar mobile
    // Laptop: pt-32 (128px) -> Cukup lega tapi compact
    <div className="relative bg-white border-b border-slate-100 overflow-hidden pt-24 pb-8 lg:pt-32 lg:pb-12">
      {/* --- BACKGROUND EFFECTS (Dikecilkan Opacity-nya biar ga ganggu) --- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />

      {/* Orb effect diperkecil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-primary-purple/5 blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumbs - Versi Mini & Compact */}
        {breadcrumbs && (
          <div className="inline-flex justify-center mb-4 animate-fade-in-up">
            <nav className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] md:text-xs font-medium text-slate-500 hover:bg-white hover:shadow-sm transition-all">
              <Link
                href="/"
                className="hover:text-primary-purple transition-colors flex items-center"
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
                      className="hover:text-primary-purple transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-primary-purple font-bold">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}

        {/* Title - Compact Size (Max 5xl di laptop) */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight animate-fade-in-up animation-delay-100">
          {title}
        </h1>

        {/* Description - Lebih ringkas */}
        {description && (
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

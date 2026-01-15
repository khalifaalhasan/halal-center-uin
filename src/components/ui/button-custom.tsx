import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline"; // Tambah outline jika perlu
  size?: "sm" | "md" | "lg"; // <--- Tambah ini
  className?: string;
}

export function ButtonCustom({
  href,
  children,
  variant = "primary",
  size = "md", // Default ukuran medium
  className = "",
}: ButtonProps) {
  // Base styles (bentuk dasar)
  const baseStyles =
    "rounded-full font-bold transition-all flex items-center justify-center gap-2";

  // Varian Ukuran (Size)
  const sizes = {
    sm: "px-5 py-2.5 text-sm", // Cocok untuk Navbar
    md: "px-8 py-4 text-base", // Cocok untuk Hero / CTA Utama
    lg: "px-10 py-5 text-lg", // Cocok untuk Section yang butuh emphasis besar
  };

  // Varian Warna (Style)
  const variants = {
    primary:
      "bg-primary text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
    secondary:
      "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-primary/30",
    outline: "bg-transparent border border-white text-white hover:bg-white/10",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

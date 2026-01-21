"use client"; // Wajib untuk Framer Motion

import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants/nav-links";
import branding from "@/constants/branding.json";
import { Mail, MapPin, Phone, Instagram, Linkedin, Globe } from "lucide-react";
import { motion } from "framer-motion"; // 1. Import Motion

// --- VARIAN ANIMASI ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda waktu antar kolom
      delayChildren: 0.2, // Sedikit delay sebelum mulai
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

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Mengambil submenu 'Layanan' dari navLinks untuk ditampilkan di footer
  const layananMenu = navLinks.find((link) => link.name === "Layanan")?.submenu;

  // Menu Legal
  const legalLinks = [
    { name: "Kebijakan Privasi", href: "/privacy-policy" },
    { name: "Syarat & Ketentuan", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- TOP SECTION (GRID LAYOUT) --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // Animasi berulang saat scroll
        >
          {/* COLUMN 1: BRAND & CONTACT */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logolph.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl text-slate-900 leading-tight">
                {branding.brand.shortName}
              </span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed">
              Lembaga Pemeriksa Halal resmi yang berkomitmen membantu pelaku
              usaha dalam proses sertifikasi halal dengan cepat, transparan, dan
              profesional.
            </p>

            <div className="space-y-4 pt-2">
              <ContactItem
                icon={<Mail size={16} />}
                text="lph@radenfatah.ac.id"
                href="mailto:lph@radenfatah.ac.id"
              />
              <ContactItem
                icon={<Phone size={16} />}
                text="+62 812-3456-7890"
                href="https://wa.me/6281234567890"
              />
              <ContactItem
                icon={<MapPin size={16} />}
                text="Palembang, Indonesia"
              />
            </div>
          </motion.div>

          {/* COLUMN 2: MENU UTAMA */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-slate-900 text-lg mb-6">Menu</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium block hover:translate-x-1 transition-transform duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3: LAYANAN */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-slate-900 text-lg mb-6">Layanan</h3>
            <ul className="space-y-4">
              {layananMenu ? (
                layananMenu.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium block hover:translate-x-1 transition-transform duration-300"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-400 text-sm">
                  Tidak ada data layanan
                </li>
              )}
            </ul>
          </motion.div>

          {/* COLUMN 4: LEGAL & SOCIAL */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-slate-900 text-lg mb-6">
              Legal & Bantuan
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium block hover:translate-x-1 transition-transform duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* --- BOTTOM SECTION (COPYRIGHT) --- */}
        <motion.div
          className="bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {currentYear} <strong>{branding.brand.name}</strong>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <SocialIcon href="#" icon={<Instagram size={18} />} />
            <SocialIcon href="#" icon={<Linkedin size={18} />} />
            <SocialIcon
              href="https://uinradenfatah.ac.id"
              icon={<Globe size={18} />}
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

// --- SUB COMPONENTS ---

function ContactItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const Content = () => (
    <div className="flex items-start gap-3 group cursor-pointer">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
        {icon}
      </div>
      <span className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors mt-1.5 break-all">
        {text}
      </span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer">
      <Content />
    </a>
  ) : (
    <Content />
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm transform hover:scale-110"
    >
      {icon}
    </a>
  );
}

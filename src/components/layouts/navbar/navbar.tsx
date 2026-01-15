"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* GUNAKAN 'justify-between' AGAR LOGO KIRI, MENU KANAN */}
        <div className="flex justify-between items-center h-14">
          {/* LOGO (KIRI) */}
          <Link href="/" className="flex-shrink-0 relative group">
            <div className="relative w-28 h-28 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
              <Image
                src="/images/logolph.png"
                alt="Brand Logo"
                fill
                className="object-contain drop-shadow-sm"
                priority
                sizes="(max-width: 768px) 50px, 64px"
              />
            </div>
          </Link>

          {/* MENU (KANAN) */}
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}

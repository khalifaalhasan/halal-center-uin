"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { navLinks } from "@/constants/nav-links";
import { ButtonCustom } from "@/components/ui/button-custom";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300 shadow-xl z-50">
          {/* PERBAIKAN DISINI: 
              Ganti 'h-[80vh]' menjadi 'max-h-[85vh]' 
              Agar tingginya fleksibel mengikuti konten, tapi tetap scrollable jika kepanjangan.
          */}
          <div className="px-4 pt-2 pb-6 space-y-1 max-h-[85vh] overflow-y-auto">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              const isDropdownActive = link.submenu
                ? link.submenu.some((sub) => pathname.startsWith(sub.href))
                : false;

              return (
                <div key={link.name}>
                  {link.submenu ? (
                    // --- MOBILE DROPDOWN ---
                    <div className="border-b border-gray-50 last:border-0">
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-4 text-base font-medium hover:text-indigo-600 transition-colors",
                          isDropdownActive || activeDropdown === link.name
                            ? "text-indigo-600"
                            : "text-gray-700"
                        )}
                      >
                        {link.name}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Submenu Content */}
                      {activeDropdown === link.name && (
                        <div className="bg-gray-50 rounded-lg mb-2 mx-2 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-200">
                          {link.submenu.map((sub) => {
                            const isSubActive = pathname === sub.href;

                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                target={sub.isExternal ? "_blank" : undefined}
                                rel={
                                  sub.isExternal
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className={cn(
                                  "flex justify-between items-center px-3 py-3 text-sm font-medium rounded-md transition-colors",
                                  isSubActive
                                    ? "bg-indigo-100/50 text-indigo-700"
                                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                )}
                              >
                                <span>{sub.name}</span>
                                {sub.isExternal && (
                                  <ExternalLink
                                    size={14}
                                    className="opacity-50"
                                  />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    // --- MOBILE SINGLE LINK ---
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className={cn(
                        "flex justify-between items-center px-3 py-4 text-base font-medium rounded-xl transition-all",
                        isActive
                          ? "bg-indigo-50 text-indigo-600 font-semibold"
                          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      )}
                    >
                      <span>{link.name}</span>
                      {link.isExternal && (
                        <ExternalLink size={16} className="opacity-60" />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}

            {/* BUTTON DAFTAR */}
            <div className="pt-6 px-2">
              <ButtonCustom
                href="https://ptsp.halal.go.id"
                className="w-full flex justify-center items-center gap-2 py-4 bg-indigo-600 text-white font-semibold rounded-xl text-lg shadow-lg hover hover:shadow-indigo-200"
                size="sm"
              >
                Daftar Sekarang <ExternalLink size={18} />
              </ButtonCustom>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navLinks } from "@/constants/nav-links";
import { ExternalLink } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-6">
      <NavigationMenu>
        <NavigationMenuList className="justify-start">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            const isDropdownActive = link.submenu
              ? link.submenu.some((sub) => pathname.startsWith(sub.href))
              : false;

            return (
              <NavigationMenuItem key={link.name}>
                {link.submenu ? (
                  // --- DROPDOWN MENU ---
                  <>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors",
                        isDropdownActive ? "text-indigo-600" : "text-gray-600"
                      )}
                    >
                      {link.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {/* Container Dropdown */}
                      <ul className="grid w-[240px] gap-1 p-2 bg-white shadow-lg rounded-lg">
                        {link.submenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;

                          return (
                            <li key={subItem.name} className="w-full">
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  target={
                                    subItem.isExternal ? "_blank" : undefined
                                  }
                                  rel={
                                    subItem.isExternal
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  className={cn(
                                    // === FIX UI SUBMENU ===
                                    // 1. flex flex-row: Wajib baris
                                    // 2. items-center: Wajib tengah vertikal
                                    // 3. text-left: Paksa teks rata kiri (mengatasi center)
                                    // 4. w-full: Menu memenuhi lebar dropdown
                                    "flex flex-row items-center justify-between w-full rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-indigo-50 hover:text-indigo-600",
                                    isSubActive
                                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                                      : "text-gray-600 font-medium"
                                  )}
                                >
                                  {/* Teks: flex-1 agar mendorong icon ke kanan */}
                                  <span className="flex-1 text-left truncate">
                                    {subItem.name}
                                  </span>

                                  {/* Icon: shrink-0 agar tidak turun/gepeng */}
                                  {subItem.isExternal && (
                                    <ExternalLink
                                      size={14}
                                      className="opacity-50 ml-2 shrink-0"
                                    />
                                  )}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  // --- SINGLE LINK (MENU UTAMA) ---
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        // Single Link Style
                        "bg-transparent hover:bg-indigo-50 hover:text-indigo-600 font-medium cursor-pointer transition-colors flex flex-row items-center gap-2",
                        isActive ? "text-indigo-600 font-bold" : "text-gray-600"
                      )}
                    >
                      <span>{link.name}</span>
                      {link.isExternal && (
                        <ExternalLink
                          size={14}
                          className="opacity-60 shrink-0"
                        />
                      )}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <ButtonCustom
        href="https://ptsp.halal.go.id"
        className="w-auto shadow-md text-white hover:shadow-indigo-200 text-sm"
        size="sm"
      >
        Daftar Sekarang <ExternalLink size={14} className="ml-1" />
      </ButtonCustom>
    </div>
  );
}

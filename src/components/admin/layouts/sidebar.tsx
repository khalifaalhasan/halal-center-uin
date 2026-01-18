"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Berita & Artikel",
    icon: FileText,
    href: "/admin/posts",
  },
  {
    label: "Kategori",
    icon: Tags,
    href: "/admin/categories",
  },
  {
    label: "Pengguna",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Pengaturan",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            {/* Logo Placeholder atau Icon */}
            <div className="absolute inset-0 bg-emerald-500 rounded-lg opacity-20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center text-emerald-500 font-bold">
              H
            </div>
          </div>
          <h1 className="text-xl font-bold">
            Halal<span className="text-emerald-500">Center</span>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => {
            // Logic Active State dengan startsWith
            // Khusus dashboard (/admin) harus exact match, sisanya startsWith
            const isActive =
              pathname === route.href ||
              (route.href !== "/admin" && pathname?.startsWith(route.href));

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-all duration-200",
                  isActive
                    ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20" // Active State (Green)
                    : "text-zinc-400 hover:text-white hover:bg-white/10", // Inactive State
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon
                    className={cn(
                      "h-5 w-5 mr-3",
                      isActive
                        ? "text-emerald-400"
                        : "text-zinc-400 group-hover:text-white",
                    )}
                  />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tombol Logout di Bawah */}
      <div className="px-3 py-2 border-t border-gray-800">
        <button className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-red-500/10 rounded-lg transition text-zinc-400 hover:text-red-400">
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 group-hover:text-red-400" />
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}

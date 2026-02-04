"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { House, LogOut } from "lucide-react";
import { adminRoutes } from "@/constants/admin-menu"; // Import menu tadi

export function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  // Loading State (Skeleton)
  if (status === "loading") {
    return (
      <div className="w-64 h-full bg-[#111827] flex flex-col border-r border-gray-800 p-4 hidden md:flex">
        <div className="flex items-center pl-3 mb-14 animate-pulse">
          <div className="w-8 h-8 bg-gray-700 rounded-lg mr-4"></div>
          <div className="h-6 w-32 bg-gray-700 rounded"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 bg-gray-800/50 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white border-r border-gray-800">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
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
          {adminRoutes.map((route) => {
            // LOGIC FILTER ROLE
            if (
              route.roles &&
              (!userRole || !route.roles.includes(userRole as string))
            ) {
              return null;
            }

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
                    ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/10",
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon
                    className={cn(
                      "h-5 w-5 mr-3 transition-colors",
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

      <div className="px-3 py-2 border-t border-gray-800">
        <Link
          href="/" // <--- Langsung arahkan ke root/beranda
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-blue-500/10 rounded-lg transition text-zinc-400 hover:text-blue-400"
        >
          <div className="flex items-center flex-1">
            <House className="h-5 w-5 mr-3 group-hover:text-blue-400 transition-colors" />
            Kembali Ke Beranda
          </div>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-red-500/10 rounded-lg transition text-zinc-400 hover:text-red-400"
        >
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 group-hover:text-red-400 transition-colors" />
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}

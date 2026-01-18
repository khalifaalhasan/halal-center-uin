"use client";

import { usePathname } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function Header() {
  const pathname = usePathname();

  // Logic simple untuk generate breadcrumb dari URL
  // Contoh: /admin/posts/create -> ['admin', 'posts', 'create']
  const paths = pathname?.split("/").filter(Boolean) || [];

  return (
    <div className="border-b bg-background/95 backdrop-blur z-50 sticky top-0">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* 1. Mobile Toggle (Hanya muncul di HP) */}
        <MobileSidebar />

        {/* 2. Breadcrumbs (Responsive: Hidden di HP kecil banget) */}
        <div className="hidden md:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join("/")}`;
                const isLast = index === paths.length - 1;
                // Ubah "posts" jadi "Posts" (Capitalize)
                const title = path.charAt(0).toUpperCase() + path.slice(1);

                return (
                  <React.Fragment key={path}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Spacer agar elemen berikutnya mentok kanan */}
        <div className="ml-auto flex items-center space-x-4">
          {/* 3. Search Bar */}
          <div className="relative w-full sm:w-64 hidden sm:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search data..."
              className="pl-8 h-9 bg-gray-50 border-gray-200 focus-visible:ring-emerald-500"
            />
          </div>

          {/* 4. User Profile */}
          <UserNav />
        </div>
      </div>
    </div>
  );
}

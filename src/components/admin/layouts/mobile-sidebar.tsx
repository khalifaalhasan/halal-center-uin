"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/admin/layouts/sidebar";
import { Button } from "@/components/ui/button"; // Pastikan sudah install button
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Mencegah Hydration Error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Tutup sidebar otomatis saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-[#111827] border-r-gray-800 text-white w-72">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
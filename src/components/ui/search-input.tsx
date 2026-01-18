"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // Opsional: kalau mau install library, tp kita pake cara manual aja biar irit

export function SearchInput({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Fungsi handleSearch dengan delay (Debounce) manual agar tidak spam server setiap ketik 1 huruf
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    // Reset halaman ke 1 jika user mencari (opsional jika nanti ada pagination)
    // params.set('page', '1');

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-9 w-full md:w-[300px] bg-white"
        placeholder={placeholder}
        onChange={(e) => {
          // Kita kasih delay 300ms manual
          setTimeout(() => handleSearch(e.target.value), 300);
        }}
        defaultValue={searchParams.get("q")?.toString()}
      />
    </div>
  );
}

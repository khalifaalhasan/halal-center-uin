"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

export function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isTyping, setIsTyping] = useState(false);

  // Default value dari URL
  const defaultValue = searchParams.get("q")?.toString();

  // Fungsi ini baru akan jalan 300ms setelah user BERHENTI mengetik
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    // Update URL tanpa refresh halaman
    replace(`${pathname}?${params.toString()}`);
    setIsTyping(false);
  }, 300);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Cari artikel..."
        defaultValue={defaultValue}
        onChange={(e) => {
          setIsTyping(true);
          handleSearch(e.target.value);
        }}
        className="peer w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-all placeholder:text-slate-400"
      />

      {/* Search Icon (Kiri) */}
      <Search
        size={18}
        className="absolute left-3 top-3 text-slate-400 peer-focus:text-indigo-600 transition-colors"
      />

      {/* Loading Spinner Kecil (Kanan) - Muncul pas ngetik doang */}
      {isTyping && (
        <div className="absolute right-3 top-3">
          <Loader2 size={18} className="animate-spin text-indigo-600" />
        </div>
      )}
    </div>
  );
}

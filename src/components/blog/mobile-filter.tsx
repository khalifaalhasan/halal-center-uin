"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchForm } from "./blog-search";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { posts: number };
}

export function MobileFilter({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden mb-6">
      {/* Tombol Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 font-medium active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-indigo-600" />
          <span>Cari & Kategori</span>
        </div>
        {isOpen ? <X size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Panel Content (Expandable) */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-5">
          {/* 1. Search Form */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
              Pencarian
            </label>
            <SearchForm />
          </div>

          {/* 2. Categories (Pill Style) */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">
              Kategori Topik
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  onClick={() => setIsOpen(false)} // Tutup menu pas diklik
                  className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 text-xs font-medium rounded-full transition-colors border border-transparent hover:border-indigo-100"
                >
                  {cat.name} ({cat._count.posts})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

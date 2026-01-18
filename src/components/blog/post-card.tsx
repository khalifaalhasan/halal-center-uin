import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  image?: string | null;
  authorName: string;
  createdAt: Date;
  categoryName?: string;
}

export function PostCard({
  title,
  slug,
  excerpt,
  image,
  authorName,
  createdAt,
  categoryName,
}: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-row md:flex-col bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full"
    >
      {/* --- IMAGE SECTION --- */}
      <div className="relative w-32 min-w-[120px] md:w-full md:h-48 bg-slate-100 shrink-0">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            // 👇 TAMBAHKAN INI (Solusi Masalah Docker/Localhost)
            unoptimized={true}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-300">
            <span className="text-[10px] md:text-xs font-medium">No Image</span>
          </div>
        )}

        {/* Category Badge (Desktop Only) */}
        {categoryName && (
          <span className="hidden md:block absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold rounded-full shadow-sm">
            {categoryName}
          </span>
        )}
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="flex flex-col flex-1 p-3 md:p-6 justify-between">
        <div>
          {/* Mobile Category */}
          {categoryName && (
            <span className="md:hidden block text-[10px] font-bold text-indigo-600 mb-1 uppercase tracking-wide">
              {categoryName}
            </span>
          )}

          {/* Title */}
          <h3 className="text-sm md:text-xl font-bold text-slate-800 mb-1 md:mb-2 line-clamp-2 md:line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="hidden md:block text-slate-500 text-sm line-clamp-3 mb-4">
            {excerpt || "Tidak ada ringkasan."}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-[10px] md:text-xs text-slate-400 mt-2 md:mt-0">
          <div className="flex items-center gap-1">
            <Calendar size={12} className="md:w-3.5 md:h-3.5" />
            <span>{formatDate(createdAt)}</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <User size={12} className="md:w-3.5 md:h-3.5" />
            <span>{authorName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

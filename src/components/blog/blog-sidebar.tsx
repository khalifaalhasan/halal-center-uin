import Link from "next/link";
import Image from "next/image";
import { getCategories, getRecentPosts } from "@/services/post-service";
import { formatDate } from "@/lib/utils";
// Import form yang baru dibuat
import { SearchForm } from "./blog-search";

export async function BlogSidebar() {
  const [recentPosts, categories] = await Promise.all([
    getRecentPosts(),
    getCategories(),
  ]);

  return (
    <aside className="space-y-8">
      {/* 1. SEARCH WIDGET */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Cari Artikel</h3>
        <SearchForm />
      </div>

      {/* 2. KATEGORI */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Kategori</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/blog?category=${cat.slug}`}
                className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-600 group"
              >
                <span>{cat.name}</span>
                <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-xs group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {cat._count.posts}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. RECENT POSTS (Updated Image Fix) */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Artikel Terbaru</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex gap-3 group"
            >
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    // 👇 TAMBAHKAN INI LAGI
                    unoptimized={true}
                  />
                ) : (
                  // Fallback jika tidak ada gambar
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-xs text-slate-500">
                    No Img
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-semibold text-slate-700 leading-tight mb-1 group-hover:text-indigo-600 line-clamp-2">
                  {post.title}
                </h4>
                <span className="text-xs text-slate-400">
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

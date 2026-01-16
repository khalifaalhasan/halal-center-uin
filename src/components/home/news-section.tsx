import Link from "next/link";
import { getRecentPosts } from "@/services/post-service";
import { PostCard } from "@/components/blog/post-card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { SectionHeader } from "@/components/ui/section-header";
import { ArrowRight } from "lucide-react";

export default async function NewsSection() {
  // 1. Fetch Data Real dari Database
  const posts = await getRecentPosts();

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- HEADER --- */}
        <SectionHeader
          badge="Wawasan & Informasi"
          title={
            <>
              Kabar Terbaru dari <br className="hidden md:block" />
              <span className="text-primary">LPH UIN Raden Fatah</span>
            </>
          }
          // Link diarahkan ke /blog bukan /berita agar konsisten
          linkHref="/blog"
          linkText="Lihat Semua Artikel"
        />

        {/* --- CONTENT GRID --- */}
        {posts.length > 0 ? (
          // Layout:
          // Mobile -> Scroll Samping (Carousel)
          // Desktop -> Grid 3 Kolom
          <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 md:gap-8 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex-shrink-0 w-[85vw] md:w-auto snap-center h-full"
              >
                {/* Reuse Component PostCard */}
                <PostCard
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  image={post.image}
                  authorName={post.author.name}
                  createdAt={post.createdAt}
                  categoryName={post.category?.name}
                />
              </div>
            ))}
          </div>
        ) : (
          // Empty State jika belum ada postingan
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-100 border-dashed">
            <p className="text-slate-400">Belum ada kabar terbaru saat ini.</p>
          </div>
        )}

        {/* --- MOBILE BUTTON (Visible only on Mobile) --- */}
        <div className="mt-2 md:hidden text-center">
          <ButtonCustom
            href="/blog"
            variant="secondary"
            size="sm"
            className="w-full justify-center group"
          >
            Lihat Semua Artikel
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </ButtonCustom>
        </div>
      </div>
    </section>
  );
}

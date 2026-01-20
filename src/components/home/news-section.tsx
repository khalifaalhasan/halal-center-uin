import Link from "next/link";
import { getRecentPosts } from "@/services/post-service";
import { PostCard } from "@/components/blog/post-card";
import { ButtonCustom } from "@/components/ui/button-custom"; // Asumsi path ini
import { SectionHeader } from "@/components/ui/section-header"; // Asumsi path ini (reusable header)
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Fallback jika ButtonCustom tidak ada

export default async function NewsSection() {
  // Ambil 3 berita saja agar homepage tidak kepanjangan
  // Pastikan service getRecentPosts support parameter limit, atau slice array-nya
  const allPosts = await getRecentPosts();
  const posts = allPosts.slice(0, 3); // Kita batasi 3 berita di homepage

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
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
          subtitle="Ikuti perkembangan terbaru kegiatan dan informasi sertifikasi halal."
          linkHref="/blog"
          linkText="Lihat Semua Artikel"
        />

        {/* --- CONTENT GRID --- */}
        {posts.length > 0 ? (
          // PERUBAHAN DISINI:
          // Mobile: Grid 1 Kolom (Vertikal ke bawah) -> Memanfaatkan layout PostCard "Row"
          // Desktop: Grid 3 Kolom (Horizontal) -> Memanfaatkan layout PostCard "Col"
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-10">
            {posts.map((post) => (
              <div key={post.id} className="h-full">
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
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed shadow-sm">
            <p className="text-slate-400 text-sm">
              Belum ada kabar terbaru saat ini.
            </p>
          </div>
        )}

        {/* --- MOBILE BUTTON (Tombol "Lihat Semua" di bawah list) --- */}
        {/* Hanya muncul di Mobile, karena Desktop sudah ada link di SectionHeader */}
        <div className="mt-8 md:hidden text-center">
          <Link href="/blog">
            <Button variant="outline" className="w-full group">
              Lihat Semua Artikel
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { getRecentPosts } from "@/services/post-service";
import NewsContent from "../client/news-content";

export default async function NewsSection() {
  // Ambil data di Server (Cepat & SEO Friendly)
  const allPosts = await getRecentPosts();
  const posts = allPosts.slice(0, 3); // Batasi 3 berita

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Render Client Component untuk Animasi */}
        <NewsContent posts={posts} />
      </div>
    </section>
  );
}

import { Suspense } from "react";
import { PostGrid } from "@/components/blog/blog-grid";
import { PostListSkeleton } from "@/components/blog/blog-list-skeleton";

// Definisi tipe props halaman
interface BlogPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Ambil query parameter (Next.js 15 mewajibkan await)
  const { q } = await searchParams;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Artikel & Berita
        </h1>
        <p className="text-slate-500">
          {q
            ? `Menampilkan hasil pencarian: "${q}"`
            : "Update terbaru seputar regulasi dan industri halal."}
        </p>
      </div>

      {/* Suspense akan menampilkan Skeleton saat data sedang diambil ulang
        key={q} memastikan React merender ulang Suspense saat kata kunci berubah
      */}
      <Suspense key={q} fallback={<PostListSkeleton />}>
        <PostGrid query={q} />
      </Suspense>
    </>
  );
}

import { getPosts } from "@/services/post-service";
import { PostCard } from "@/components/blog/post-card";

// Komponen ini Khusus Fetching & Rendering Grid
export async function PostGrid({ query }: { query?: string }) {
  // Tambahkan artificial delay sedikit biar loading skeleton kelihatan (UX)
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Uncomment buat ngetes skeleton

  const posts = await getPosts(query);

  if (posts.length === 0) {
    return (
      <div className="bg-white p-10 rounded-xl text-center border border-slate-100 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-slate-500 font-medium mb-2">
          Artikel tidak ditemukan.
        </p>
        <p className="text-sm text-slate-400">
          Coba kata kunci lain seperti "Halal", "Regulasi", dll.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          slug={post.slug}
          excerpt={post.excerpt}
          image={post.image}
          authorName={post.author.name}
          createdAt={post.createdAt}
          categoryName={post.category?.name}
        />
      ))}
    </div>
  );
}

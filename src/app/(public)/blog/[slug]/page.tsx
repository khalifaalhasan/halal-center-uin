import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/services/post-service";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next"; 

interface BlogDetailProps {
  params: Promise<{
    slug: string;
  }>;
}


export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Halaman yang Anda cari tidak tersedia.",
    };
  }

  // Buat deskripsi singkat dari excerpt atau potong konten jika excerpt kosong
  const description = post.excerpt
    ? post.excerpt.slice(0, 160)
    : post.content.slice(0, 160) + "...";

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author.name],
      images: post.image // Jika ada gambar, gunakan untuk preview medsos
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

// 👇 3. KOMPONEN PAGE (Tetap seperti sebelumnya)
export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white rounded-2xl p-6 md:p-10 border border-slate-100 shadow-sm">
      {/* 1. HEADER ARTIKEL */}
      <header className="mb-8">
        {/* Category Badge */}
        {post.category && (
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            {post.category.name}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta Data (Author & Date) */}
        <div className="flex items-center gap-6 text-sm text-slate-500 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              <User size={16} className="text-slate-500" />
            </div>
            <span className="font-medium text-slate-700">
              {post.author.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </header>

      {/* 2. FEATURED IMAGE */}
      {post.image && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            
            unoptimized={true}
          />
        </div>
      )}

      {/* 3. CONTENT BODY */}
      <div className="prose prose-slate prose-lg max-w-none mb-10">
        {post.content.split("\n").map((paragraph, idx) => (
          <p key={idx} className="mb-4 text-slate-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* 4. FOOTER (Back Button) */}
      <div className="border-t border-slate-100 pt-6 mt-8 flex justify-between items-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Kembali ke Blog
        </Link>
      </div>
    </article>
  );
}

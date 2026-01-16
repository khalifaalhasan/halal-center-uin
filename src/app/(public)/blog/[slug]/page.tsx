import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/services/post-service";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

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

      {/* 4. FOOTER (Tags / Back Button) */}
      <div className="border-t border-slate-100 pt-6 mt-8 flex justify-between items-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Kembali ke Blog
        </Link>

        {/* Placeholder Share Button (Optional) */}
        <div className="text-sm text-slate-400">Share this post</div>
      </div>
    </article>
  );
}

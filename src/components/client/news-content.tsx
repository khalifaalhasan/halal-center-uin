"use client";

import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeader } from "@/components/ui/section-header";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// --- VARIAN ANIMASI ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay antar elemen (Header -> Post 1 -> Post 2...)
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// Tipe data untuk props (sesuaikan dengan output prisma/service)
interface NewsContentProps {
  posts: any[]; // Bisa diganti dengan tipe Post yang lebih spesifik jika ada
}

export default function NewsContent({ posts }: NewsContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // 👈 REQUEST KM: Animasi berulang saat scroll
    >
      {/* --- HEADER (Item 1) --- */}
      <motion.div variants={itemVariants}>
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
      </motion.div>

      {/* --- CONTENT GRID (Item 2, 3, 4) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="h-full"
            >
              <PostCard
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                image={post.image}
                authorName={post.author.name}
                createdAt={post.createdAt}
                categoryName={post.category?.name}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={itemVariants}
            className="col-span-3 text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed shadow-sm"
          >
            <p className="text-slate-400 text-sm">
              Belum ada kabar terbaru saat ini.
            </p>
          </motion.div>
        )}
      </div>

      {/* --- MOBILE BUTTON (Item Terakhir) --- */}
      <motion.div
        variants={itemVariants}
        className="mt-8 md:hidden text-center"
      >
        <Link href="/blog">
          <Button variant="outline" className="w-full group">
            Lihat Semua Artikel
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

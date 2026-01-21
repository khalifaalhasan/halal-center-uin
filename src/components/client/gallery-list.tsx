"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// --- VARIAN ANIMASI ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Foto muncul satu per satu (efek gelombang)
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// Definisikan tipe data props (sesuai select prisma)
interface GalleryListProps {
  photos: {
    id: string;
    title: string;
    slug: string;
    image: string | null;
    category: { name: string } | null;
  }[];
}

export default function GalleryList({ photos }: GalleryListProps) {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // 👈 REQUEST KM: Animasi berulang saat scroll
    >
      {photos.map((photo) => (
        <motion.div key={photo.id} variants={itemVariants}>
          <Link
            href={`/blog/${photo.slug}`}
            className="group relative block overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-all h-full"
          >
            <div className="aspect-video relative w-full">
              {photo.image && (
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized={true}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 text-left">
              <span className="inline-block px-1.5 py-0.5 mb-1 text-[8px] md:text-[10px] font-semibold text-white bg-indigo-600 rounded">
                {photo.category?.name || "Umum"}
              </span>

              <h3 className="text-xs md:text-sm font-semibold text-white line-clamp-2 leading-tight">
                {photo.title}
              </h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

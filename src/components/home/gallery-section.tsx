import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { SectionHeader } from "@/components/ui/section-header";

export default async function GallerySection() {
  const photos = await prisma.post.findMany({
    where: {
      published: true,
      image: { not: null },
      NOT: { image: "" },
    },
    orderBy: { createdAt: "desc" },
    take: 8,
    select: {
      id: true,
      title: true,
      slug: true,
      image: true,
      category: { select: { name: true } },
    },
  });

  if (photos.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white">
      {/* UPDATE DISINI: Gunakan max-w-7xl agar sejajar dengan section lain */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            <>
              Galeri <span className="text-primary">LPH UIN Raden Fatah</span>
            </>
          }
          subtitle="Dokumentasi visual kegiatan terbaru"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href={`/blog/${photo.slug}`}
              className="group relative block overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-all"
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
          ))}
        </div>
      </div>
    </section>
  );
}

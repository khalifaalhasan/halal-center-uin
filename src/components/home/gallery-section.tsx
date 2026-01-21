import { prisma } from "@/lib/prisma";
import { SectionHeader } from "@/components/ui/section-header";
import GalleryList from "../client/gallery-list";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            <>
              Galeri <span className="text-primary">LPH UIN Raden Fatah</span>
            </>
          }
          subtitle="Dokumentasi visual kegiatan terbaru"
        />

        {/* Panggil Client Component untuk render Grid + Animasi */}
        <GalleryList photos={photos} />
      </div>
    </section>
  );
}

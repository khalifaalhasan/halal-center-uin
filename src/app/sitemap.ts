import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// MEWAJIBKAN sitemap di-generate di server (bukan statis saat build)
export const revalidate = 0; 
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // --- PROTEKSI FASE BUILD ---
  // Jika sedang build di Docker, kembalikan halaman statis saja agar tidak error koneksi DB
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return [
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/blog`, lastModified: new Date() }
    ];
  }

  try {
    // 1. Ambil Data Postingan Berita (Hanya yang published)
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updateAt: true },
    });

    // 2. Mapping Berita ke Format Sitemap
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updateAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // 3. Halaman Statis Manual
    const staticEntries: MetadataRoute.Sitemap = [
      { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
      { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
      { url: `${baseUrl}/tentang-kami`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
      { url: `${baseUrl}/layanan/LPH`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
      { url: `${baseUrl}/layanan/lph/reguler`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
      { url: `${baseUrl}/layanan/lph/self-diclare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
      { url: `${baseUrl}/layanan/lp3h`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ];

    return [...staticEntries, ...postEntries];
  } catch (error) {
    // Jika DB error, minimal sitemap statis tetap muncul
    console.error("Sitemap DB Error:", error);
    return [{ url: baseUrl, lastModified: new Date() }];
  }
}
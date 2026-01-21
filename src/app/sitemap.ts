import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/layanan/LPH`, // Sesuaikan route yang ada
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/layanan/lph/reguler`, // Sesuaikan route yang ada
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/layanan/lph/self-diclare`, // Sesuaikan route yang ada
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/layanan/lp3h`, // Sesuaikan route yang ada
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 4. Gabungkan Semuanya
  return [...staticEntries, ...postEntries];
}

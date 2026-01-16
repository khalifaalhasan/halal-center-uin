import { prisma } from "@/lib/prisma"; // Pastikan sudah setup prisma client instance
import { PostFormValues } from "@/lib/validations/posts";
import { slugify } from "@/lib/utils";

// --- GET ALL ---
// ... import prisma dll

// Update fungsi getPosts
export const getPosts = async (query?: string) => {
  // Logic Filter: Jika ada query, cari di Title ATAU Content
  const whereClause = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" as const } }, // insensitive = tidak peduli huruf besar/kecil
          { content: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  return await prisma.post.findMany({
    where: {
      published: true, // Pastikan hanya yang published
      ...whereClause,
    },
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true } },
    },
  });
};

// ... fungsi lainnya (getRecentPosts, dll) tetep sama

// --- GET BY ID ---
export const getPostById = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id },
  });
};

// --- GET BY SLUG (Untuk Halaman Detail) ---
export const getPostBySlug = async (slug: string) => {
  return await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
    },
  });
};

// --- CREATE ---
export const createPost = async (data: PostFormValues, authorId: string) => {
  // Logic: Jika slug kosong, generate dari title
  let slug =
    data.slug && data.slug.trim() !== "" ? data.slug : slugify(data.title);

  // Cek keunikan slug (Best Practice: Handle duplikat)
  const existingSlug = await prisma.post.findUnique({ where: { slug } });
  if (existingSlug) {
    // Sederhana: tambahkan timestamp agar unik
    slug = `${slug}-${Date.now()}`;
  }

  return await prisma.post.create({
    data: {
      title: data.title,
      slug: slug,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      published: data.published,
      categoryId: data.categoryId,
      authorId: authorId, // Relasi wajib
    },
  });
};

// --- UPDATE ---
export const updatePost = async (id: string, data: PostFormValues) => {
  // Logic: Jika slug diubah, cek duplikat lagi (opsional, tergantung kebutuhan bisnis)
  // Untuk simplifikasi, kita update field yang ada saja

  return await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      published: data.published,
      categoryId: data.categoryId,
      // Slug biasanya jarang diupdate karena merusak SEO,
      // tapi jika perlu, tambahkan logic slugify di sini.
    },
  });
};

// --- DELETE ---
export const deletePost = async (id: string) => {
  return await prisma.post.delete({
    where: { id },
  });
};

// --- FETCH UNTUK SIDEBAR ---
export const getRecentPosts = async () => {
  return await prisma.post.findMany({
    take: 5, // Ambil 5 post terbaru
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      image: true,
    },
  });
};

export const getCategories = async () => {
  // Ambil kategori beserta jumlah post-nya
  return await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
};

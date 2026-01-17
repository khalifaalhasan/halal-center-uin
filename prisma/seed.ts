import { PrismaClient } from "@prisma/client";
// Hapus import faker
// Hapus import bcrypt sementara jika bikin error, atau gunakan try-catch

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding manual...");

  // 1. Buat User Admin
  // Kita hardcode password hash (ini hash dari 'password123')
  // Biar ga butuh library bcrypt saat seeding
  const passwordHash = "$2b$10$EpRnTzVlqHNP0.fKbXWrHu.nceb2e2b9a.Cp/Hk.0/dW/X9.J.W"; 

  const user = await prisma.user.upsert({
    where: { email: "admin@uin.ac.id" },
    update: {},
    create: {
      name: "Admin Halal Center",
      email: "admin@uin.ac.id",
      password: passwordHash, 
      image: "https://ui-avatars.com/api/?name=Admin+Halal",
      role: "ADMIN" // Hapus baris ini kalau di schema ga ada role
    },
  });

  console.log(`👤 User ready: ${user.email}`);

  // 2. Buat Kategori Manual
  const categoriesData = [
    { name: "Teknologi", slug: "teknologi" },
    { name: "Berita", slug: "berita" },
    { name: "Edukasi", slug: "edukasi" }
  ];

  const dbCategories = [];
  for (const c of categoriesData) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    dbCategories.push(cat);
  }

  // 3. Buat Post Manual (Looping sederhana)
  console.log("📝 Creating posts...");
  for (let i = 1; i <= 3; i++) {
    await prisma.post.create({
      data: {
        title: `Contoh Berita Halal ${i}`,
        slug: `contoh-berita-halal-${i}-${Date.now()}`,
        excerpt: "Ringkasan berita untuk testing tampilan website.",
        content: "Isi konten berita yang cukup panjang untuk demo. Halal center UIN berkomitmen memajukan industri halal di Indonesia.",
        image: "https://placehold.co/600x400/png",
        published: true,
        authorId: user.id,
        categoryId: dbCategories[0].id, // Masukkan ke kategori pertama
      },
    });
  }

  console.log("✅ Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
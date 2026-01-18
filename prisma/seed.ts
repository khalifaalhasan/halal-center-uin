import { PrismaClient } from "@prisma/client";
import { fakerID_ID as faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // --- [BAGIAN PENTING: BERSIH-BERSIH] ---
  // Kita hapus dulu Postingan lama biar tidak error Foreign Key saat hapus User
  await prisma.post.deleteMany();
  // Kita hapus User Admin lama (jika ada) biar benar-benar fresh
  await prisma.user.deleteMany({
    where: { email: "admin@uin.ac.id" },
  });
  console.log("🧹 Data lama dibersihkan.");
  // ---------------------------------------

  // 1. Hash Password
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // 2. Buat User Admin BARU (Pakai create, karena sudah dihapus di atas)
  const user = await prisma.user.create({
    data: {
      name: "Admin Halal Center",
      email: "admin@uin.ac.id",
      password: hashedPassword,
      image: "https://ui-avatars.com/api/?name=Admin+Halal&background=random",
      role: "ADMIN",
    },
  });

  console.log(`👤 Author created: ${user.name}`);

  // 3. Buat Kategori
  const categoriesData = [
    { name: "Teknologi", slug: "teknologi" },
    { name: "Berita Utama", slug: "berita-utama" },
    { name: "Edukasi Halal", slug: "edukasi-halal" },
    { name: "Gaya Hidup", slug: "gaya-hidup" },
  ];

  const dbCategories = [];
  for (const c of categoriesData) {
    // Gunakan upsert untuk kategori gpp, karena jarang konflik
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    dbCategories.push(cat);
  }

  // 4. Generate Postingan
  console.log("📝 Generating 10 posts...");
  
  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.sentence({ min: 4, max: 8 });
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") + "-" + faker.string.alphanumeric(4);

    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        excerpt: faker.lorem.sentences(2),
        content: faker.lorem.paragraphs(5),
        image: faker.image.urlLoremFlickr({ category: "business" }),
        published: true,
        authorId: user.id,
        categoryId: dbCategories[Math.floor(Math.random() * dbCategories.length)].id,
        createdAt: faker.date.past(),
      },
    });
  }

  console.log("✅ Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
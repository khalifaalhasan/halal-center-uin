import { PrismaClient } from "@prisma/client";
import { fakerID_ID as faker } from "@faker-js/faker"; // Pakai locale Indonesia biar teksnya bahasa Indo

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // 1. AMBIL USER YANG SUDAH ADA
  // Kita ambil user pertama yg ditemukan di DB sebagai author
  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error(
      "❌ Error: Tidak ada User di database. Buat user manual dulu atau adjust script ini."
    );
  }

  console.log(`👤 Using author: ${user.name} (${user.id})`);

  // 2. BUAT KATEGORI DUMMY (Opsional, biar post ada kategorinya)
  // Menggunakan upsert agar tidak error kalau dijalankan berulang
  const categoryTeknologi = await prisma.category.upsert({
    where: { slug: "teknologi" },
    update: {},
    create: {
      name: "Teknologi",
      slug: "teknologi",
    },
  });

  const categoryLifestyle = await prisma.category.upsert({
    where: { slug: "lifestyle" },
    update: {},
    create: {
      name: "Lifestyle",
      slug: "lifestyle",
    },
  });

  const categories = [categoryTeknologi, categoryLifestyle];

  // 3. GENERATE POSTS
  console.log("📝 Generating posts...");

  // Kita buat 10 postingan
  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.sentence({ min: 4, max: 8 });
    // Bikin slug dari title (lowercase + replace spasi)
    const slug =
      faker.helpers.slugify(title).toLowerCase() +
      "-" +
      faker.string.alphanumeric(4);

    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        excerpt: faker.lorem.sentences(2),
        content: faker.lorem.paragraphs(5), // Artikel panjang (5 paragraf)
        image: faker.image.urlLoremFlickr({ category: "business" }), // Gambar random
        published: faker.datatype.boolean(), // Random true/false
        authorId: user.id, // Link ke user yg sudah ada
        categoryId:
          categories[Math.floor(Math.random() * categories.length)].id, // Random category
        createdAt: faker.date.past(), // Tanggal acak di masa lampau
      },
    });
  }

  console.log("✅ Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

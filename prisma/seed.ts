import { PrismaClient } from "@prisma/client";
import { fakerID_ID as faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // --- [1. BERSIH-BERSIH DATA LAMA] ---
  // Urutan delete penting untuk menghindari error Foreign Key
  await prisma.teamMember.deleteMany(); // Hapus Struktur Organisasi
  await prisma.post.deleteMany();       // Hapus Postingan
  await prisma.category.deleteMany();   // Hapus Kategori
  await prisma.user.deleteMany();       // Hapus User
  
  console.log("🧹 Data lama dibersihkan.");


  // --- [2. SEED USER ADMIN UTAMA] ---
  // Hash password sesuai request
  const hashedPassword = await bcrypt.hash("26maret2005", 10);

  const user = await prisma.user.create({
    data: {
      name: "Khalifa Al Hasan",
      email: "khlfaalhsn5@gmail.com",
      password: hashedPassword,
      image: "https://ui-avatars.com/api/?name=Khalifa+Al+Hasan&background=0D8ABC&color=fff",
      role: "ADMIN",
    },
  });

  console.log(`👤 Admin created: ${user.email}`);


  // --- [3. SEED KATEGORI & POSTINGAN] ---
  const categoriesData = [
    { name: "Teknologi", slug: "teknologi" },
    { name: "Berita Utama", slug: "berita-utama" },
    { name: "Edukasi Halal", slug: "edukasi-halal" },
    { name: "Gaya Hidup", slug: "gaya-hidup" },
  ];

  const dbCategories = [];
  for (const c of categoriesData) {
    const cat = await prisma.category.create({ data: c });
    dbCategories.push(cat);
  }

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
        // Gunakan loremflickr agar gambar bervariasi
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
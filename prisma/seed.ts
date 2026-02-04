import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { fakerID_ID as faker } from "@faker-js/faker"; // Pakai locale Indonesia

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // --- [1. BERSIH-BERSIH DATA LAMA] ---
  // Urutan delete penting (Child dulu baru Parent)
  await prisma.teamMember.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Database dibersihkan.");

  // --- [2. PERSIAPAN PASSWORD HASH] ---
  const passwordKhalifa = await bcrypt.hash("26maret2005", 10);
  const passwordLPH = await bcrypt.hash("lphuinradenfatah2025", 10);

  // --- [3. CREATE USER (Tampung di variabel biar bisa diambil ID-nya)] ---
  
  // User 1: Super Admin
  const userSuper = await prisma.user.create({
    data: {
      name: "Khalifa Al Hasan",
      email: "khlfaalhsn5@gmail.com",
      password: passwordKhalifa,
      role: "SUPER_ADMIN",
      image: "https://ui-avatars.com/api/?name=Khalifa+Super&background=7c3aed&color=fff",
    },
  });
  console.log("✅ Created: SUPER_ADMIN (khlfaalhsn5@gmail.com)");

  // User 2: Admin Biasa
  const userAdmin = await prisma.user.create({
    data: {
      name: "Khalifa Admin",
      email: "khalifaalhasann@gmail.com",
      password: passwordKhalifa,
      role: "ADMIN",
      image: "https://ui-avatars.com/api/?name=Khalifa+Admin&background=10b981&color=fff",
    },
  });
  console.log("✅ Created: ADMIN (khalifaalhasann@gmail.com)");

  // User 3: Super Admin LPH
  const userLPH = await prisma.user.create({
    data: {
      name: "LPH UIN Raden Fatah",
      email: "lph@radenfatah.ac.id",
      password: passwordLPH,
      role: "SUPER_ADMIN",
      image: "https://ui-avatars.com/api/?name=LPH+UIN&background=f59e0b&color=fff",
    },
  });
  console.log("✅ Created: SUPER_ADMIN (lph@radenfatah.ac.id)");

  // Kumpulkan User ID untuk random author post
  const allUserIds = [userSuper.id, userAdmin.id, userLPH.id];

  // --- [4. CREATE CATEGORIES] ---
  const categoryNames = [
    "Berita Utama",
    "Edukasi Halal",
    "Kegiatan UIN",
    "Opini & Artikel",
    "Teknologi Pangan"
  ];

  const categoryIds: string[] = [];

  console.log("📝 Creating Categories...");
  for (const name of categoryNames) {
    // Bikin slug manual simple
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    const cat = await prisma.category.create({
      data: {
        name: name,
        slug: slug,
      },
    });
    categoryIds.push(cat.id);
  }

  // --- [5. CREATE POSTS (BERITA)] ---
  console.log("📰 Generating 20 Dummy Posts...");

  for (let i = 0; i < 20; i++) {
    const title = faker.lorem.sentence({ min: 4, max: 9 });
    // Bikin slug unik + random string biar gak bentrok
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") + "-" + faker.string.alphanumeric(5);

    // Random Author & Category
    const randomAuthorId = allUserIds[Math.floor(Math.random() * allUserIds.length)];
    const randomCategoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];

    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        excerpt: faker.lorem.paragraph(1), // Ringkasan pendek
        content: `
          <p>${faker.lorem.paragraph()}</p>
          <h2>${faker.lorem.sentence()}</h2>
          <p>${faker.lorem.paragraph()}</p>
          <ul>
            <li>${faker.lorem.words(4)}</li>
            <li>${faker.lorem.words(4)}</li>
            <li>${faker.lorem.words(4)}</li>
          </ul>
          <p>${faker.lorem.paragraph()}</p>
        `, // Simulasi HTML content
        image: faker.image.urlLoremFlickr({ category: "business" }), // Gambar random
        published: faker.datatype.boolean(0.8), // 80% kemungkinan published
        authorId: randomAuthorId,
        categoryId: randomCategoryId,
        createdAt: faker.date.past(), // Tanggal acak di masa lalu
      },
    });
  }

  console.log("🚀 Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
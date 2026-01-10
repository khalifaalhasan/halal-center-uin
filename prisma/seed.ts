// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Start seeding...')

  // 1. Buat User Admin
  const passwordHash = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'khlfaallhsn5@gmail.com' },
    update: {},
    create: {
      email: 'khlfaalhsn5@gmail.com',
      name: 'Super Admin',
      password: passwordHash,
      role: 'admin',
    },
  })
  console.log(`👤 Admin created: ${admin.email}`)

  // 2. Buat Kategori
  const categories = [
    { name: 'Berita & Artikel', slug: 'berita' },
    { name: 'Kegiatan', slug: 'kegiatan' },
    { name: 'Regulasi', slug: 'regulasi' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('fyp📂 Categories created')

  // 3. Buat Dummy Post
  const catBerita = await prisma.category.findUnique({ where: { slug: 'berita' } })
  
  if (catBerita) {
    await prisma.post.upsert({
      where: { slug: 'halal-center-uin-resmi-dibuka' },
      update: {},
      create: {
        title: 'Halal Center UIN Resmi Dibuka untuk Umum',
        slug: 'halal-center-uin-resmi-dibuka',
        excerpt: 'Pusat kajian halal ini diharapkan menjadi rujukan utama sertifikasi halal di Sumatera Selatan.',
        content: '<p>Lorem ipsum dolor sit amet...</p>', // Anggap ini HTML dari Rich Text Editor
        published: true,
        authorId: admin.id,
        categoryId: catBerita.id,
      },
    })
    console.log('📝 Dummy post created')
  }

  console.log('✅ Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
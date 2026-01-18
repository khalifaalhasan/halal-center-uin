import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Inisialisasi Client
const s3Client = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT || "http://localhost:9000", // Ganti localhost dengan IP VPS jika dev mode dari luar
  forcePathStyle: true, // Wajib true untuk MinIO
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export async function uploadFile(file: File, folder: string = "uploads") {
  // 1. Siapkan Buffer dari file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 2. Buat nama file unik (timestamp + nama asli yg dibersihkan)
  const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  // 3. Upload ke MinIO
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
    ACL: "public-read", // Agar bisa diakses publik (pastikan bucket policy public)
  });

  try {
    await s3Client.send(command);
    
    // 4. Return URL lengkap gambar
    // Hati-hati: Di docker 'endpoint' itu internal (http://minio:9000).
    // Untuk URL publik yang disimpan di DB, harus URL yang bisa diakses user (misal domain VPS)
    // Contoh: https://halal.uin-radenfatah.ac.id/storage/bucket-name/file.jpg
    // Untuk setup lokal/sederhana kita return path relatif atau construct URL manual
    
    // Asumsi: Nanti kamu setup Nginx proxy pass untuk /storage ke port 9000
    return `/storage/${process.env.S3_BUCKET_NAME}/${fileName}`;
  } catch (error) {
    console.error("Error uploading to MinIO:", error);
    throw new Error("Gagal upload gambar");
  }
}
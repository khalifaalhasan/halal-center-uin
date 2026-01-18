import * as Minio from "minio";

// Konfigurasi Client MinIO
// Pastikan variabel ini ada di .env (lihat langkah 2 di bawah)
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT || "9000"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
});

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || "halal-images";

// Fungsi Upload File
export async function uploadImage(file: File): Promise<string> {
  // 1. Pastikan Bucket Ada
  const bucketExists = await minioClient.bucketExists(BUCKET_NAME);
  if (!bucketExists) {
    await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
    // Set policy agar file bisa dibaca publik (ReadOnly)
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
        },
      ],
    };
    await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
  }

  // 2. Convert File ke Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 3. Buat Nama File Unik (biar gak bentrok)
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

  // 4. Upload ke MinIO
  await minioClient.putObject(BUCKET_NAME, fileName, buffer, file.size, {
    "Content-Type": file.type,
  });

  // 5. Kembalikan URL Publik (Gunakan localhost:9000 untuk akses browser)
  // Note: Di production nanti ganti localhost jadi domain server
  const publicUrl = `http://localhost:9000/${BUCKET_NAME}/${fileName}`;

  return publicUrl;
}

import * as Minio from "minio";

// --- 1. KONFIGURASI CLIENT ---
// Kita ambil dari S3_... sesuai docker-compose.yml
// Penting: MinIO Library minta hostname TANPA http:// dan TANPA Port
const endPointUrl = process.env.S3_ENDPOINT || "minio"; 
const endPointClean = endPointUrl.replace("http://", "").replace(":9000", "");

const minioClient = new Minio.Client({
  endPoint: endPointClean, // Harusnya hasilnya "minio"
  port: 9000,
  useSSL: false,
  accessKey: process.env.S3_ACCESS_KEY || "minioadmin",
  secretKey: process.env.S3_SECRET_KEY || "minioadmin",
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "berita";

// --- 2. FUNGSI UPLOAD ---
export async function uploadImage(file: File): Promise<string> {
  // A. Validasi File
  if (!file) throw new Error("File tidak ditemukan.");

  // B. Cek Bucket (Otomatis buat kalau belum ada)
  const bucketExists = await minioClient.bucketExists(BUCKET_NAME);

  if (!bucketExists) {
    await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
    
    // Set Policy Public Read
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

  // C. Convert & Upload
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
  const metaData = { "Content-Type": file.type };

  await minioClient.putObject(BUCKET_NAME, fileName, buffer, file.size, metaData);

  // F. Return URL Publik (YANG BENAR)
  // Kita harus bedakan alamat internal (docker) dan eksternal (browser)
  // Kalau ada env var NEXT_PUBLIC_MINIO_URL, pakai itu. Kalau gak, pakai IP VPS.
  
  const publicHost = process.env.NEXT_PUBLIC_MINIO_URL || "http://localhost:9001"; // Ganti port 9001 (Browser akses)
  
  // Hati-hati: Browser akses port 9001, tapi URL gambar MinIO biasanya tetap via port API (9000)
  // TAPI karena kita pakai Docker Port Forwarding:
  // Browser User -> VPS:9000 -> MinIO:9000
  
  // Jadi URL publiknya:
  const finalHost = process.env.NEXT_PUBLIC_MINIO_URL || "http://103.84.119.130:9000"; 
  
  return `${finalHost}/${BUCKET_NAME}/${fileName}`;
}

// --- 3. DELETE ---
export async function deleteImage(fileUrl: string): Promise<void> {
    try {
      const urlParts = fileUrl.split("/");
      const objectName = urlParts[urlParts.length - 1];
      if (!objectName) return;
      await minioClient.removeObject(BUCKET_NAME, objectName);
    } catch (error) {
      console.error("Delete failed:", error);
    }
}
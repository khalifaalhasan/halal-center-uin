import * as Minio from "minio";

// --- 1. KONFIGURASI CLIENT (Internal Network) ---
// Ini digunakan Next.js untuk ngobrol sama Container MinIO
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT || "9000"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
});

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || "halal-images";

// --- 2. FUNGSI UPLOAD ---
export async function uploadImage(file: File): Promise<string> {
  // A. Validasi File
  if (!file) throw new Error("File tidak ditemukan.");

  // B. Cek Bucket (Buat otomatis kalo belum ada)
  const bucketExists = await minioClient.bucketExists(BUCKET_NAME);

  if (!bucketExists) {
    await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
    console.log(`✅ Bucket '${BUCKET_NAME}' berhasil dibuat.`);

    // Set Policy agar Public Read (Wajib biar gambar muncul di Frontend)
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
    console.log(`🔓 Bucket Policy diset ke Public.`);
  }

  // C. Convert File ke Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // D. Generate Nama Unik
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

  // E. Upload ke MinIO
  // metaData diset agar browser tahu ini gambar (bukan download file bin)
  const metaData = {
    "Content-Type": file.type,
  };

  await minioClient.putObject(
    BUCKET_NAME,
    fileName,
    buffer,
    file.size,
    metaData,
  );

  // F. Return URL Publik
  // PENTING:
  // - Saat upload, Next.js pakai "minio:9000" (Internal Docker Network).
  // - Tapi browser user ada di luar Docker, jadi harus akses via "localhost:9000".
  const publicUrl = `http://localhost:9000/${BUCKET_NAME}/${fileName}`;

  return publicUrl;
}

// --- 3. FUNGSI DELETE ---
export async function deleteImage(fileUrl: string): Promise<void> {
  try {
    // Ambil nama file dari URL
    // Contoh: http://localhost:9000/halal-images/17099...jpg -> 17099...jpg
    const urlParts = fileUrl.split("/");
    const objectName = urlParts[urlParts.length - 1];

    if (!objectName) return;

    await minioClient.removeObject(BUCKET_NAME, objectName);
    console.log(`🗑️ Delete image success: ${objectName}`);
  } catch (error) {
    console.error("⚠️ Failed to delete image from storage: ", error);
    // Kita suppress errornya agar tidak memblokir proses delete data utama di DB
  }
}

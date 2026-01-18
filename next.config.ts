import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co", // Gambar dummy statis
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com", // Avatar user
      },
      {
        protocol: "http",
        hostname: "localhost", // MinIO di laptop
        port: "9000",
      },
      {
        protocol: "http",
        hostname: "minio", // MinIO di dalam Docker
        port: "9000",
      },
      // --- TAMBAHAN BARU ---
      {
        protocol: "https",
        hostname: "loremflickr.com", // Gambar random dari Seed/Faker
      },
    ],
  },
  output: "standalone",

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Bisa set '5mb' kalau mau lebih lega
    },
  },
};

export default nextConfig;

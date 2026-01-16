import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      // Tambahkan domain lain di sini jika nanti butuh (misal: googleusercontent, dll)
    ],
  } /* config options here */,
};

export default nextConfig;

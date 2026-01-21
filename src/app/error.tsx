"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { RotateCcw } from "lucide-react";
import { DisconnectIcon } from "@/components/disconnect-icon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full text-center">
        {/* Ilustrasi: Diberi warna text-destructive agar SVG jadi Merah */}
        <div className="mb-6 flex justify-center text-destructive">
          <DisconnectIcon className="w-64 h-auto" />
        </div>

        {/* Teks Judul: text-destructive */}
        <h1 className="text-6xl font-extrabold text-destructive mb-2 tracking-tight">
          Oops!
        </h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Terjadi Kesalahan Sistem
        </h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto leading-relaxed">
          Maaf, koneksi terputus atau server sedang bermasalah.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Tombol Try Again: Varian outline dengan warna merah */}
          <Button
            onClick={() => reset()}
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-destructive/30 text-destructive hover:bg-destructive/10 font-semibold"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Coba Lagi
          </Button>

          {/* Tombol Home: Varian destructive (merah solid) */}
          <Link href="/">
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full px-8 font-semibold shadow-lg shadow-destructive/30"
            >
              KEMBALI KE BERANDA
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

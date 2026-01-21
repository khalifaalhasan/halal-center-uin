import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DisconnectIcon } from "@/components/disconnect-icon";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full text-center">
        {/* Ilustrasi: Diberi warna text-primary agar SVG jadi Ungu */}
        <div className="mb-6 flex justify-center text-primary">
          <DisconnectIcon className="w-64 h-auto" />
        </div>

        {/* Teks Judul: text-primary */}
        <h1 className="text-6xl font-extrabold text-primary mb-2 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto leading-relaxed">
          Maaf, halaman yang Anda cari tidak ditemukan atau link mungkin rusak.
        </p>

        {/* Tombol: Menggunakan varian default (primary) */}
        <Link href="/">
          <Button
            size="lg"
            // Gunakan shadow-primary dengan opacity
            className="rounded-full px-8 font-semibold transition-all shadow-lg shadow-primary/30"
          >
            GO HOME
          </Button>
        </Link>
      </div>
    </div>
  );
}

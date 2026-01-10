// src/app/dashboard/page.tsx
import { verifySession } from "@/lib/session";

export default async function DashboardPage() {
  // Ambil data session user yang sedang login
  const session = await verifySession();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">
          Selamat Datang, Admin! 👋
        </h1>
        <p className="text-gray-500">
          ID Pengguna: {session?.userId}
        </p>
      </header>

      {/* Widget Sederhana */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Artikel</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Layanan Aktif</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">5</p>
        </div>
      </div>
    </div>
  );
}
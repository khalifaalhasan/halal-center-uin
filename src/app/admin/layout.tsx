import { Sidebar } from "@/components/admin/layouts/sidebar";
import { Header } from "@/components/admin/layouts/header"; // Import Header Baru
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin Dashboard - Halal Center UIN",
  description: "Halaman admin pengelola konten",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      {/* Sidebar Desktop (Fixed Left) */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="md:pl-72 min-h-screen bg-gray-50/50">
        {/* Header (Sticky Top, berisi Breadcrumb, Search, Profile) */}
        <Header />

        {/* Konten Halaman */}
        <div className="p-8">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}

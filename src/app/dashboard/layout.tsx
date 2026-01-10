// src/app/dashboard/layout.tsx
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";
import { logoutAction } from "@/actions/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-indigo-600">Halal Center</h2>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavLink href="/dashboard/posts" icon={<FileText size={20} />} label="Berita & Artikel" />
          <NavLink href="/dashboard/settings" icon={<Settings size={20} />} label="Pengaturan" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <form action={logoutAction}>
            <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
              <LogOut size={20} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

// Helper Component untuk Link Aktif (Bisa dikembangkan nanti pakai usePathname)
function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition font-medium"
    >
      {icon}
      {label}
    </Link>
  )
}
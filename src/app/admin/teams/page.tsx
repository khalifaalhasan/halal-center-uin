import {
  getOrganizationTree,
  getAllMembersFlat,
} from "@/services/organization-service";
import { AdminOrgTree } from "@/components/admin/teams/admin-org-tree";
import { OrgDialog } from "@/components/admin/teams/org-dialog";
import { AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOrgPage() {
  // 1. Fetch Tree (untuk visualisasi)
  const orgTree = await getOrganizationTree();

  // 2. Fetch Flat List (untuk dropdown opsi atasan)
  const allMembers = await getAllMembersFlat();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Struktur Organisasi
          </h2>
          <p className="text-muted-foreground text-sm">
            Kelola hierarki pengurus LPH. Drag & Drop belum didukung, gunakan
            Edit Parent.
          </p>
        </div>

        {/* Tombol Tambah (Di Header) */}
        <OrgDialog allMembers={allMembers} />
      </div>

      <div className="bg-slate-50/50 p-4 md:p-6 rounded-xl border border-dashed min-h-[400px]">
        {orgTree ? (
          // Render Tree Mulai dari Root
          <AdminOrgTree
            node={orgTree}
            allMembersFlat={allMembers}
            parentId={null} // Root tidak punya parent
          />
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <AlertCircle className="h-10 w-10 text-slate-300 mb-3" />
            <h3 className="font-semibold text-slate-900">Belum ada struktur</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-4">
              Silakan tambahkan anggota pertama sebagai pimpinan tertinggi.
            </p>
            <OrgDialog allMembers={allMembers} />
          </div>
        )}
      </div>
    </div>
  );
}

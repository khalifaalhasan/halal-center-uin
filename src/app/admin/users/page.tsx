import { auth } from "@/auth";
import { getUsers } from "@/actions/users";
import { redirect } from "next/navigation";
import UserTable from "@/components/admin/users/user-table";
import AddUserForm from "@/components/admin/users/add-user-form";

export default async function AdminUsersPage() {
  // 1. Proteksi Level Server (Double Kill security)
  const session = await auth();

  // Pastikan role string match dengan database (SUPER_ADMIN)
  // Casting 'as string' biar aman dari protes TypeScript
  if ((session?.user?.role as string) !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  // 2. Ambil data segar dari database
  const users = await getUsers();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Akses
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola siapa saja yang bisa masuk ke dapur aplikasi.
          </p>
        </div>
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          Super Admin Area 🔒
        </span>
      </div>

      {/* Form Section */}
      <AddUserForm />

      {/* Table Section */}
      <UserTable users={users} />
    </div>
  );
}

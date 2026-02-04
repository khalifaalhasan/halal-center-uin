"use client"

import { deleteUser, updateUserRole } from "@/actions/users"
import { useTransition } from "react"

// Kita hardcode type biar gak ada drama import Prisma error lagi
type UserProps = {
  id: string
  name: string | null
  email: string | null
  role: string // String biasa aja biar aman
  createdAt: Date
  image: string | null
}

export default function UserTable({ users }: { users: UserProps[] }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = (id: string) => {
    if (confirm("Apakah anda yakin ingin menghapus user ini secara permanen?")) {
      startTransition(async () => {
        await deleteUser(id)
      })
    }
  }

  const handleRoleChange = (id: string, newRole: string) => {
    startTransition(async () => {
      // @ts-ignore: Aman, backend validasi ulang
      await updateUserRole(id, newRole)
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-800">Daftar Pengguna ({users.length})</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 uppercase text-xs font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-3">User Info</th>
              <th className="px-6 py-3">Role Access</th>
              <th className="px-6 py-3">Tanggal Join</th>
              <th className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Placeholder */}
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    disabled={isPending}
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className={`border-0 rounded-full px-3 py-1 text-xs font-bold cursor-pointer ring-1 ring-inset outline-none transition
                      ${user.role === "SUPER_ADMIN" ? "bg-purple-50 text-purple-700 ring-purple-600/20 hover:bg-purple-100" : ""}
                      ${user.role === "ADMIN" ? "bg-blue-50 text-blue-700 ring-blue-600/20 hover:bg-blue-100" : ""}
                      ${user.role === "USER" ? "bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-gray-100" : ""}
                    `}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("id-ID", {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={isPending}
                    className="text-red-500 hover:text-red-700 font-medium text-xs border border-red-200 hover:border-red-400 px-3 py-1 rounded transition disabled:opacity-50"
                  >
                    {isPending ? "..." : "Hapus"}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400 italic">
                  Belum ada user lain selain anda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
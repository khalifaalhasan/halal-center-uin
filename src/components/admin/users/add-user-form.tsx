"use client"

import { createUser } from "@/actions/users"
import { useFormStatus } from "react-dom"
import { useRef, useState } from "react" // Tambah useState

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 flex items-center gap-2"
    >
      {pending ? "Menyimpan..." : "+ Tambah User"}
    </button>
  )
}

export default function AddUserForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // State buat error

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-lg font-bold mb-1 text-gray-800">Buat Akun Baru</h2>
      <p className="text-sm text-gray-500 mb-5">Tambahkan admin atau user baru ke dalam sistem.</p>
      
      {/* Tampilkan Alert Error Jika Ada */}
      {errorMessage && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-200">
          ⚠️ {errorMessage}
        </div>
      )}

      <form 
        ref={formRef}
        // Logic baru menangani response server
        action={async (formData) => {
          setErrorMessage(null) // Reset error dulu
          
          const result = await createUser(formData)
          
          if (result?.error) {
            setErrorMessage(result.error) // Tampilkan error Zod/DB
          } else {
            formRef.current?.reset()
            alert("✅ " + result.success) // Feedback sukses
          }
        }} 
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        {/* ... INPUT LAIN TETAP SAMA ... */}
        
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Nama</label>
          <input required name="name" type="text" placeholder="Nama Lengkap" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black transition" />
        </div>
        
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Email</label>
          <input required name="email" type="email" placeholder="email@uin.ac.id" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black transition" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Password</label>
          {/* Min length di HTML juga bisa ditambahin buat UX */}
          <input required name="password" type="password" minLength={6} placeholder="******" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black transition" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Role</label>
          <select name="role" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-black transition">
            <option value="USER">User Biasa</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>

        <div className="md:col-span-4 flex justify-end mt-2">
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
// src/components/auth/login-form.tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { loginAction, LoginFormState } from '@/actions/auth' 
import { Lock, Mail, AlertCircle } from 'lucide-react'
import { useActionState } from 'react'

// 1. Initial State yang aman
const initialState: LoginFormState = {
  success: false,
  message: '',
}

export function LoginForm() {
  // 2. Gunakan useFormState (Lebih stabil untuk Next.js 14/15)
  // Action akan otomatis handle redirect jika sukses.
  // State hanya akan terupdate jika terjadi ERROR (gagal login).
  const [state, action] = useActionState(loginAction, initialState)

  return (
    <form action={action} className="space-y-5">
      
      {/* Alert Error - Hanya muncul jika success: false dan ada pesan */}
      {!state?.success && state?.message && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} />
          <span>{state.message}</span>
        </div>
      )}

      {/* Input Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400"><Mail size={20} /></span>
          <input
            id="email" 
            name="email" 
            type="email" 
            required 
            placeholder="admin@halal.uin.ac.id"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Input Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400"><Lock size={20} /></span>
          <input
            id="password" 
            name="password" 
            type="password" 
            required 
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-2.5 px-4 text-white font-medium rounded-lg shadow-sm transition-all flex justify-center
        ${pending ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
      `}
    >
      {pending ? (
        <span className="flex items-center gap-2">
           Loading...
        </span>
      ) : (
        "Masuk Dashboard"
      )}
    </button>
  )
}
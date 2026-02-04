// src/components/auth/login-form.tsx
"use client";

import { useActionState, useState } from "react"; // Tambah useState
import { useFormStatus } from "react-dom";
import { loginAction, LoginFormState } from "@/actions/auth";
import { Lock, Mail, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";

// 1. Initial State
const initialState: LoginFormState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialState);
  const [isVisible, setIsVisible] = useState(false); // State untuk toggle password

  return (
    <form action={action} className="space-y-6">
      {/* Alert Error */}
      {!state?.success && state?.message && (
        <div className="flex items-center gap-3 p-4 text-sm text-red-600 bg-red-50/50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} className="shrink-0" />
          <span className="font-medium">{state.message}</span>
        </div>
      )}

      {/* Input Email */}
      <div className="space-y-2">
        <label
          className="text-sm font-semibold text-gray-900 ml-1"
          htmlFor="email"
        >
          Email
        </label>
        <div className="relative group">
          <span className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-violet-600 transition-colors">
            <Mail size={20} />
          </span>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="admin@halal.uin.ac.id"
            className="w-full pl-11 pr-4 h-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all placeholder:text-gray-400 text-sm"
          />
        </div>
      </div>

      {/* Input Password dengan Toggle */}
      <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
          <label
            className="text-sm font-semibold text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
        </div>

        <div className="relative group">
          <span className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-violet-600 transition-colors">
            <Lock size={20} />
          </span>

          <input
            id="password"
            name="password"
            type={isVisible ? "text" : "password"} // Logic type dynamic
            required
            placeholder="••••••••"
            className="w-full pl-11 pr-12 h-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all placeholder:text-gray-400 text-sm"
          />

          {/* Tombol Mata (Toggle) */}
          <button
            type="button" // PENTING: Agar tidak submit form
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 focus:text-violet-600 transition-colors outline-none"
            aria-label={isVisible ? "Sembunyikan password" : "Lihat password"}
          >
            {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Memproses...</span>
        </>
      ) : (
        "Masuk Dashboard"
      )}
    </button>
  );
}

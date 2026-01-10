// src/app/(auth)/login/page.tsx
import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form'; // Kita akan buat ini di step 4

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500">
            Masuk untuk mengelola konten Halal Center
          </p>
        </div>

        {/* Form Section (Dipisah biar Clean) */}
        <LoginForm />

        {/* Footer Link */}
        <div className="text-center text-sm text-gray-500">
          <Link href="/" className="hover:underline hover:text-indigo-600 transition">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
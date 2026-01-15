"use client";

import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom"; // Asumsi kamu punya ini
import { PageHeader } from "@/components/ui/page-header";

export default function CalculatorFrame() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section>
      <PageHeader
        title="Simulasi Biaya Sertifikasi"
        description="Gunakan kalkulator resmi dari BPJPH di bawah ini untuk mendapatkan
            estimasi biaya pemeriksaan."
        breadcrumbs={[{ label: "Layanan" }, { label: "Kalkulator Biaya" }]}
      />
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Iframe Container */}
          <div className="relative w-full h-[900px] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Loading Spinner (Muncul saat iframe belum siap) */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-slate-500 text-sm">
                  Memuat Kalkulator BPJPH...
                </p>
              </div>
            )}

            {/* THE IFRAME */}
            <iframe
              src="https://bpjph.halal.go.id/kalkulator-biaya-sh/"
              className="w-full h-full border-0"
              title="Kalkulator Biaya Halal BPJPH"
              onLoad={() => setIsLoading(false)}
              // Sandbox permission penting agar fungsi JS di dalam iframe jalan
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />

            {/* Overlay Fallback (Jika Iframe Gagal/Diblokir Browser) */}
            <div className="absolute bottom-4 right-4 z-20">
              <p className="text-[10px] text-slate-400 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                Sumber: bpjph.halal.go.id
              </p>
            </div>
          </div>

          {/* Tombol Alternatif (Jaga-jaga kalau error) */}
          <div className="mt-6 text-center text-slate-400">
            <p className="text-sm text-slate-400 mb-2">
              Mengalami kendala saat memuat kalkulator?
            </p>
            <ButtonCustom
              href="https://bpjph.halal.go.id/kalkulator-biaya-sh/"
              variant="secondary"
              size="sm"
              className="mx-auto bg-slate-400 text-slate-800"
            >
              Buka di Website Resmi <ExternalLink size={14} className="ml-2" />
            </ButtonCustom>
          </div>
        </div>
      </div>
    </section>
  );
}

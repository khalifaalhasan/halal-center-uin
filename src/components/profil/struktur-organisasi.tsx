import { SectionHeader } from "../ui/section-header";
import StrukturImage from "./struktur-image"; // Import komponen baru

// Hapus "force-dynamic" karena sekarang halamannya static (lebih cepat)
// export const dynamic = "force-dynamic";

export default function StrukturOrganisasiPage() {
  return (
    <div className="py-20 bg-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          badge="Struktur Organisasi"
          title={
            <>
              Pimpinan <span className="text-primary">Halal Center</span>
            </>
          }
          subtitle="Susunan pengurus LPH UIN Raden Fatah Tahun 2025."
        />

        {/* Content Area */}
        <div className="mt-10">
          {/* Panggil komponen gambar interaktif */}
          <StrukturImage />
        </div>
      </div>
    </div>
  );
}

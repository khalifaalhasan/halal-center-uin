import { PageHeader } from "@/components/ui/page-header";
import {
  Utensils,
  Coffee,
  Pill,
  FlaskConical,
  Sparkles,
  Dna,
  Beef,
  Factory,
  Warehouse,
  Truck,
  ConciergeBell,
} from "lucide-react";

// --- DATA RUANG LINGKUP ---
const SCOPES = [
  {
    icon: Utensils,
    title: "Makanan",
    description: "Pemeriksaan bahan & proses untuk kehalalan.",
  },
  {
    icon: Coffee,
    title: "Minuman",
    description: "Bebas dari unsur khamr & najis.",
  },
  {
    icon: Pill,
    title: "Obat",
    description: "Audit bahan aktif & cangkang kapsul.",
  },
  {
    icon: FlaskConical,
    title: "Kimiawi",
    description: "Bebas kontaminasi bahan non-halal.",
  },
  {
    icon: Sparkles,
    title: "Kosmetik",
    description: "Suci & tembus air wudhu.",
  },
  {
    icon: Dna,
    title: "Genetik",
    description: "Media pertumbuhan & gen sisipan halal.",
  },
  {
    icon: Beef,
    title: "Sembelihan",
    description: "Validasi RPH & kompetensi Juleha.",
  },
  {
    icon: Factory,
    title: "Pengolahan",
    description: "Cegah kontaminasi silang di pabrik.",
  },
  {
    icon: Warehouse,
    title: "Gudang",
    description: "Segregasi permanen penyimpanan.",
  },
  {
    icon: Truck,
    title: "Distribusi",
    description: "Kebersihan armada transportasi.",
  },
  {
    icon: ConciergeBell,
    title: "Penyajian",
    description: "Dapur & peralatan restoran/katering.",
  },
];

export default function RuangLingkupPage() {
  return (
    <>
      <PageHeader
        title="Ruang Lingkup Layanan"
        description="Cakupan pemeriksaan dan sertifikasi halal LPH UIN Raden Fatah."
        breadcrumbs={[{ label: "Layanan" }, { label: "Ruang Lingkup" }]}
      />

      <section className="py-10 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {SCOPES.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="contents">
                  {/* 'contents' wrapper agar grid layout tetap jalan */}

                  {/* =========================================
                      1. MOBILE CARD (Visible on Mobile Only)
                      Style: Static, Compact, Centered
                     ========================================= */}
                  <div className="md:hidden flex flex-col items-center justify-center p-2 bg-white rounded-lg border border-slate-200 shadow-sm h-full min-h-[100px] text-center">
                    {/* Icon Kecil */}
                    <div className="mb-1.5 p-1.5 rounded-full bg-indigo-50 text-indigo-600 shrink-0">
                      <Icon size={16} strokeWidth={1.5} />
                    </div>

                    {/* Judul */}
                    <h3 className="text-[10px] font-bold text-slate-800 leading-tight mb-1">
                      {item.title}
                    </h3>

                    {/* Deskripsi Statis */}
                    <p className="text-[8px] text-slate-500 leading-tight px-0.5 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* =========================================
                      2. DESKTOP CARD (Visible on Desktop Only)
                      Style: Animated Hover
                     ========================================= */}
                  <div className="hidden md:block group relative h-[260px] bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-500 cursor-default">
                    {/* Hover BG Animation */}
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-0" />

                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                      {/* Icon Animated */}
                      <div className="mb-4 p-3 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-90">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>

                      {/* Overlap Text Container */}
                      <div className="relative w-full h-[60px] flex items-center justify-center">
                        {/* Title (Hilang saat Hover) */}
                        <h3 className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-800 group-hover:text-white opacity-100 group-hover:opacity-0 scale-100 group-hover:scale-90 transition-all duration-500 ease-in-out">
                          {item.title}
                        </h3>

                        {/* Description (Muncul saat Hover) */}
                        <p className="absolute inset-0 flex items-center justify-center text-sm text-indigo-50 font-medium leading-snug opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-500 ease-in-out delay-100 px-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

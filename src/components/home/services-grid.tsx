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
import { SectionHeader } from "../ui/section-header";

// --- DATA LAYANAN ---
const SERVICES = [
  {
    icon: Utensils,
    title: "Makanan", // Dipersingkat biar muat di mobile 2 kolom
    fullTitle: "Produk Makanan",
    description: "Bahan baku hingga pengemasan sesuai syariat.",
  },
  {
    icon: Coffee,
    title: "Minuman",
    fullTitle: "Produk Minuman",
    description: "Bebas alkohol dan bahan najis.",
  },
  {
    icon: Pill,
    title: "Obat-obatan",
    fullTitle: "Produk Obat",
    description: "Bahan aktif suci dan halal.",
  },
  {
    icon: FlaskConical,
    title: "Kimiawi",
    fullTitle: "Produk Kimiawi",
    description: "Bebas unsur haram & najis.",
  },
  {
    icon: Sparkles,
    title: "Kosmetik",
    fullTitle: "Produk Kosmetik",
    description: "Aman dan suci digunakan.",
  },
  {
    icon: Dna,
    title: "Biologi",
    fullTitle: "Bahan Biologi",
    description: "Vaksin & enzim bersumber halal.",
  },
  {
    icon: Beef,
    title: "Penyembelihan",
    fullTitle: "Jasa Penyembelihan",
    description: "Sesuai syariat Islam.",
  },
  {
    icon: Factory,
    title: "Pengolahan",
    fullTitle: "Jasa Pengolahan",
    description: "Cegah kontaminasi fasilitas.",
  },
  {
    icon: Warehouse,
    title: "Penyimpanan",
    fullTitle: "Jasa Penyimpanan",
    description: "Pemisahan produk tegas.",
  },
  {
    icon: Truck,
    title: "Distribusi",
    fullTitle: "Jasa Distribusi",
    description: "Armada bersih & aman.",
  },
  {
    icon: ConciergeBell,
    title: "Penyajian",
    fullTitle: "Jasa Penyajian",
    description: "Resto & katering bebas najis.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- SECTION HEADER --- */}
        <SectionHeader
          badge="Layanan Kami"
          title={
            <>
              Lingkup <span className="text-primary">Layanan Halal</span>
            </>
          }
          subtitle="Pemeriksaan dan sertifikasi komprehensif untuk berbagai kategori produk."
        />

        {/* --- GRID CONTENT --- */}
        {/* Mobile: 2 Kolom (grid-cols-2) biar hemat tempat */}
        {/* Desktop: 4 Kolom biar luas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 mt-10">
          {SERVICES.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center p-4 md:p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon Circle */}
                {/* Mobile: Lebih kecil (w-12), Desktop: Normal (w-16) */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3 md:mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                </div>

                {/* Content */}
                {/* Judul: Lebih kecil di mobile */}
                <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-1 md:mb-2 group-hover:text-primary transition-colors">
                  <span className="md:hidden">{item.title}</span>{" "}
                  {/* Judul Pendek di HP */}
                  <span className="hidden md:inline">
                    {item.fullTitle}
                  </span>{" "}
                  {/* Judul Panjang di PC */}
                </h3>

                {/* Deskripsi: Ukuran font extra small di mobile, disembunyikan jika layar terlalu kecil */}
                <p className="text-[10px] md:text-sm text-slate-500 leading-snug line-clamp-2 md:line-clamp-3">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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

// --- DATA LAYANAN (Sesuai Standar LPH) ---
const SERVICES = [
  {
    icon: Utensils,
    title: "Produk Makanan",
    description:
      "Memastikan produk makanan sesuai prinsip halal, mulai dari bahan baku hingga pengemasan.",
  },
  {
    icon: Coffee,
    title: "Produk Minuman",
    description:
      "Menjamin bahwa produk minuman bebas dari bahan haram dan memenuhi standar kehalalan.",
  },
  {
    icon: Pill,
    title: "Produk Obat",
    description:
      "Memastikan bahan aktif maupun eksipien berasal dari sumber yang suci dan halal.",
  },
  {
    icon: FlaskConical,
    title: "Produk Kimiawi",
    description:
      "Menginspeksi produk kimia agar terbebas dari unsur haram dan sesuai prinsip Islam.",
  },
  {
    icon: Sparkles,
    title: "Produk Kosmetik",
    description:
      "Pemeriksaan produk kosmetik agar bebas dari bahan najis dan aman digunakan.",
  },
  {
    icon: Dna,
    title: "Bahan Biologi",
    description:
      "Produk biologi seperti vaksin & enzim harus dipastikan berasal dari sumber halal.",
  },
  {
    icon: Beef,
    title: "Jasa Penyembelihan",
    description:
      "Verifikasi proses penyembelihan hewan agar sesuai dengan syariat Islam.",
  },
  {
    icon: Factory,
    title: "Jasa Pengolahan",
    description:
      "Audit fasilitas pengolahan untuk mencegah kontaminasi bahan non-halal.",
  },
  {
    icon: Warehouse,
    title: "Jasa Penyimpanan",
    description:
      "Gudang & pengelolaan memastikan pemisahan tegas antara produk halal dan non-halal.",
  },
  {
    icon: Truck,
    title: "Jasa Distribusi",
    description:
      "Armada distribusi yang menjaga kebersihan dan mencegah kontaminasi silang.",
  },
  {
    icon: ConciergeBell,
    title: "Jasa Penyajian",
    description:
      "Penyajian restoran/katering yang menjamin peralatan dan tempat saji bebas najis.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- SECTION HEADER --- */}

        <SectionHeader
          badge="Layanan Kami"
          title={
            <>
              Layanan <span className="text-primary">LPH UIN Raden Fatah</span>
            </>
          }
          subtitle="Kami menyediakan layanan pemeriksaan dan sertifikasi untuk berbagai
            kategori produk guna memastikan kepatuhan halal."
        />

        {/* --- GRID CONTENT --- */}
        {/* Grid: 1 kolom (HP), 2 kolom (Tablet), 3 kolom (Laptop), 4 kolom (Monitor Besar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {SERVICES.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-slate-50 hover:-translate-y-1"
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon size={32} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
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

import { PageHeader } from "@/components/ui/page-header";
import { Target, ShieldCheck, Users2, Lightbulb, Globe2 } from "lucide-react";
import { SectionHeader } from "../ui/section-header";
import branding from "@/constants/branding.json";
export default function VisiMisiPage() {
  // Data Misi dengan Ikon Spesifik
  const misiData = [
    {
      icon: ShieldCheck,
      text: "Menyelenggarakan pemeriksaan halal yang akurat, transparan, dan akuntabel sesuai standar regulasi dan syariat Islam.",
    },
    {
      icon: Users2,
      text: "Mengembangkan kompetensi Sumber Daya Manusia auditor halal yang profesional, berintegritas, dan adaptif terhadap teknologi.",
    },
    {
      icon: Lightbulb,
      text: "Menjadi pusat literasi dan edukasi yang meningkatkan kesadaran halal bagi pelaku industri dan masyarakat luas.",
    },
    {
      icon: Globe2,
      text: "Berperan aktif secara strategis dalam penguatan ekosistem jaminan produk halal di tingkat nasional maupun global.",
    },
  ];

  return (
    <div className="py-20">
      <SectionHeader
        badge="Visi Misi"
        title={
          <>
            Visi & Misi{" "}
            <span className="text-primary">{branding.brand.name}</span>
          </>
        }
        subtitle="Landasan strategis dan tujuan kami dalam membangun ekosistem industri halal yang terpercaya."
      />

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* --- SECTION VISI (Corporate Banner Style) --- */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#2c2f4e] to-indigo-900 p-8 md:p-12 shadow-xl ring-1 ring-white/10">
            {/* Subtle Pattern Grid Background */}
            <div
              className="absolute inset-0 z-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <Target size={40} className="text-indigo-300" />
              </div>
              <div className="space-y-4">
                <h2 className="text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase">
                  Visi Organisasi
                </h2>
                <p className="text-xl md:text-3xl font-bold text-white leading-tight lg:leading-snug">
                  "Menjadi Lembaga Pemeriksa Halal yang Unggul, Terpercaya, dan
                  Berstandar Internasional dalam Mendukung Industri Halal
                  Global."
                </p>
              </div>
            </div>
          </div>

          {/* --- SECTION MISI (Strategic Grid Style) --- */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-slate-200"></div>
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider text-center">
                Misi Strategis
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            {/* Grid 2x2 untuk tampilan compact di desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {misiData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex items-start gap-5"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      {/* Menambahkan nomor urut kecil untuk kesan struktural */}
                      <span className="block text-xs font-bold text-slate-400 mb-2">
                        0{index + 1}
                      </span>
                      <p className="text-base text-slate-700 leading-relaxed font-medium">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

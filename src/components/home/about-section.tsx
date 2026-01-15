import branding from "@/constants/branding.json";
import { CheckCircle2, ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="py-20 lg:py-32 bg-slate-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* 1. KOLOM TEXT */}
          <div className="space-y-8 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Profil Lembaga
              </div>
              
              {/* Headline fokus pada "Pemeriksa" */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                Mitra Pemeriksa Halal <br/>
                <span className="text-primary">Saintifik & Syar'i.</span>
              </h2>
            </div>

            {/* Deskripsi fokus pada tugas: Memeriksa & Menguji */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sebagai unit resmi di bawah naungan <strong>UIN Raden Fatah</strong>, kami memiliki mandat dari BPJPH untuk melakukan verifikasi, pemeriksaan lapangan, dan pengujian laboratorium terhadap kehalalan produk Anda sebelum penetapan fatwa MUI.
            </p>

            {/* Fitur disesuaikan dengan keunggulan Universitas/LPH */}
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                "Nomor Registrasi BPJPH Resmi",
                "Auditor Akademisi & Praktisi",
                "Laboratorium Teruji",
                "Layanan Cepat & Akurat",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100"
                >
                  <div className="bg-primary/10 p-1.5 rounded-full text-primary">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-full hover:bg-slate-50 transition-all shadow-sm"
              >
                Lihat Akreditasi Kami <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          {/* 2. KOLOM GAMBAR */}
          <div className="relative lg:order-1 mt-8 lg:mt-0">
            {/* Background Pattern */}
            <div className="absolute -top-10 -left-10 w-2/3 h-full bg-primary/5 rounded-[3rem] -z-10" />
            <div className="absolute bottom-10 -right-10 w-24 h-24 bg-dots-pattern opacity-20 -z-10" />

            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group">
              <img
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1000"
                alt="Laboratorium LPH UIN Raden Fatah"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Card: Validasi Pemerintah */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4 max-w-[240px]">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                    Status Lembaga
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 leading-none">
                    Terdaftar di BPJPH
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import Link from "next/link"; // Import Link
import {
  User,
  FileCheck,
  Microscope,
  Gavel,
  Award,
  Clock,
  ArrowDown,
  ArrowRight, // Icon baru
  HelpCircle, // Icon baru
} from "lucide-react";

// Data disesuaikan dengan standar Resmi BPJPH / Kemenag
const steps = [
  {
    id: 1,
    title: "Permohonan Sertifikasi",
    desc: "Pelaku Usaha melakukan permohonan, upload data, dan memilih LPH melalui ptsp.halal.go.id.",
    duration: "Langkah Awal",
    icon: <User className="w-5 h-5" />,
    actor: "Pelaku Usaha",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Verifikasi Dokumen",
    desc: "BPJPH memeriksa kelengkapan dokumen. Jika lengkap, dokumen dikirim ke LPH yang dipilih.",
    duration: "1 Hari Kerja",
    icon: <FileCheck className="w-5 h-5" />,
    actor: "BPJPH",
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Pemeriksaan & Pengujian",
    desc: "Auditor Halal (LPH) melakukan pemeriksaan kehalalan produk dan pengujian laboratorium.",
    duration: "15 Hari Kerja",
    icon: <Microscope className="w-6 h-6" />,
    actor: "LPH",
    color: "bg-purple-600",
  },
  {
    id: 4,
    title: "Sidang Fatwa Halal",
    desc: "Komisi Fatwa MUI menetapkan kehalalan produk melalui sidang berdasarkan laporan LPH.",
    duration: "3 Hari Kerja",
    icon: <Gavel className="w-5 h-5" />,
    actor: "MUI",
    color: "bg-green-600",
  },
  {
    id: 5,
    title: "Penerbitan Sertifikat",
    desc: "BPJPH menerbitkan Sertifikat Halal yang dapat diunduh digital oleh Pelaku Usaha.",
    duration: "1 Hari Kerja",
    icon: <Award className="w-5 h-5" />,
    actor: "BPJPH",
    color: "bg-blue-600",
  },
];

export default function FlowSection() {
  return (
    <section id="prosedur" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-widest">
              Standar Operasional Prosedur
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Alur Proses Sertifikasi Halal
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Berdasarkan regulasi resmi SJPH, berikut adalah tahapan yang akan
            dilalui Pelaku Usaha di dalam sistem SIHALAL (ptsp.halal.go.id).
          </p>
        </div>

        {/* --- TIMELINE AREA --- */}
        <div className="relative mb-20">
          {" "}
          {/* Tambah margin bottom biar ada jarak ke CTA */}
          {/* Garis Vertikal Utama */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 md:-translate-x-1/2" />
          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    !isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* ICON */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-slate-50 shadow-sm z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step.color}`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* CARD KONTEN */}
                  <div
                    className={`w-full pl-20 md:pl-0 md:w-1/2 ${
                      !isEven ? "md:pl-16" : "md:pr-16"
                    }`}
                  >
                    <div className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-3 bg-slate-50 text-slate-500 border border-slate-100`}
                      >
                        {step.actor}
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">
                        {step.desc}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 border-t border-slate-50 pt-3">
                        <Clock size={14} />
                        Estimasi:{" "}
                        <span className="text-slate-700">{step.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Spacer (Desktop Only) */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
          {/* Icon Penutup Bawah */}
          <div className="absolute left-8 md:left-1/2 bottom-0 w-8 h-8 bg-slate-100 rounded-full border-4 border-white -translate-x-1/2 translate-y-4 flex items-center justify-center text-slate-400">
            <ArrowDown size={14} />
          </div>
        </div>

        {/* --- ADDED: CTA SECTION (JIKA KURANG PAHAM) --- */}
        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 max-w-2xl w-full text-center flex flex-col items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm">
              <HelpCircle size={24} />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Butuh Informasi Lebih Lengkap?
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Pelajari alur detail, persyaratan dokumen, dan standar pelayanan
                kami di halaman khusus Prosedur.
              </p>
            </div>

            <Link
              href="/prosedur"
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-indigo-200 text-sm"
            >
              Lihat Detail Prosedur
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

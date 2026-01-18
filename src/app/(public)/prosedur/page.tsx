import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonCustom } from "@/components/ui/button-custom";
import {
  FileText,
  UserCheck,
  Building2,
  ScrollText,
  CheckCircle2,
  Download,
  ExternalLink,
} from "lucide-react";

// --- DATA: ALUR SERTIFIKASI (10 Langkah) ---
const ALUR_STEPS = [
  {
    title: "Persiapan & NIB",
    desc: "Sebelum mendaftar, pastikan pelaku usaha memiliki email aktif dan NIB Berbasis Risiko. Jika belum, silakan daftar di oss.go.id.",
  },
  {
    title: "Buat Akun & Daftar",
    desc: "Pelaku usaha membuat akun di ptsp.halal.go.id (SIHALAL), kemudian mengajukan permohonan sertifikasi dengan mengisikan data dan mengunggah dokumen persyaratan.",
  },
  {
    title: "Verifikasi BPJPH",
    desc: "BPJPH memverifikasi kesesuaian data dan kelengkapan dokumen permohonan yang telah diajukan.",
  },
  {
    title: "Penetapan Biaya",
    desc: "LPH (Lembaga Pemeriksa Halal) menghitung, menetapkan, dan mengisikan biaya pemeriksaan di sistem SIHALAL.",
  },
  {
    title: "Pembayaran",
    desc: "Pelaku Usaha melakukan pembayaran melalui Virtual Account sesuai dengan kode pembayaran (invoice) yang tertera di SIHALAL.",
  },
  {
    title: "Penerbitan STTD",
    desc: "BPJPH melakukan verifikasi pembayaran dan menerbitkan STTD (Surat Tanda Terima Dokumen) di SIHALAL.",
  },
  {
    title: "Pemeriksaan (Audit)",
    desc: "Auditor Halal dari LPH melakukan proses pemeriksaan (audit) produk dan lokasi usaha, lalu mengunggah Laporan Pemeriksaan ke SIHALAL.",
  },
  {
    title: "Sidang Fatwa",
    desc: "Komisi Fatwa MUI melakukan Sidang Fatwa berdasarkan laporan audit dan mengunggah Ketetapan Halal di SIHALAL.",
  },
  {
    title: "Penerbitan Sertifikat",
    desc: "BPJPH menerbitkan Sertifikat Halal digital berdasarkan ketetapan fatwa.",
  },
  {
    title: "Download Sertifikat",
    desc: "Pelaku usaha mengunduh sertifikat halal di SIHALAL jika statusnya sudah 'Terbit SH'.",
  },
];

// --- DATA: PERSYARATAN DOKUMEN ---
const REQUIREMENTS = [
  {
    icon: FileText,
    title: "Surat Permohonan",
    desc: "Surat permohonan sertifikasi halal. Bagi importir/PULN, lampirkan surat kuasa penunjukan resmi.",
  },
  {
    icon: ScrollText,
    title: "Formulir Pendaftaran",
    desc: "Isian data pelaku usaha. Khusus Jasa Penyembelihan wajib memiliki juru sembelih halal (Juleha) bersertifikat/terlatih.",
  },
  {
    icon: Building2,
    title: "Aspek Legal (NIB)",
    desc: "Nomor Induk Berusaha (NIB) berbasis risiko. Untuk PULN: lisensi bisnis dan NIB perwakilan resmi.",
  },
  {
    icon: UserCheck,
    title: "Dokumen Penyelia Halal",
    desc: "KTP Penyelia, SK Penetapan Penyelia Halal, Daftar Riwayat Hidup, dan Sertifikat Pelatihan/Kompetensi Penyelia Halal.",
  },
  {
    icon: ScrollText,
    title: "Daftar Produk & Bahan",
    desc: "Daftar nama produk dan bahan/menu/barang yang akan disertifikasi.",
  },
  {
    icon: CheckCircle2,
    title: "Proses Pengolahan",
    desc: "Diagram alur produksi atau deskripsi narasi proses pengolahan produk dari awal hingga akhir.",
  },
  {
    icon: FileText,
    title: "Dokumen SJPH",
    desc: "Manual Sistem Jaminan Produk Halal (SJPH) yang berisi komitmen dan prosedur menjaga kehalalan produk.",
  },
];

export default function ProsedurPage() {
  return (
    <>
      <PageHeader
        title="Alur & Syarat Sertifikasi"
        description="Panduan lengkap langkah demi langkah menuju sertifikasi halal resmi."
        breadcrumbs={[{ label: "Prosedur" }]}
      />

      {/* --- SECTION 1: ALUR PROSES (TIMELINE) --- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical Line Connector */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2 md:translate-x-0" />

            {ALUR_STEPS.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-start md:items-center mb-12 last:mb-0 group"
              >
                {/* Number Badge */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border-4 border-slate-50 text-slate-900 font-bold z-10 group-hover:bg-primary group-hover:text-white group-hover:border-purple-100 transition-all duration-300 shadow-sm">
                  {index + 1}
                </div>

                {/* Content Layout (Zig-Zag on Desktop) */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    index % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:pl-16 md:ml-auto md:text-left"
                  }`}
                >
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md group-hover:border-purple-100 transition-all duration-300">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: PERSYARATAN DOKUMEN --- */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Dokumen Persyaratan
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Siapkan dokumen-dokumen berikut dalam format digital (PDF/JPG)
              sebelum melakukan pendaftaran.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REQUIREMENTS.map((req, index) => {
              const Icon = req.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {req.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {req.desc}
                  </p>
                </div>
              );
            })}

            {/* Card Tambahan: Download Template */}
            <div className="bg-indigo-600 rounded-xl p-6 shadow-lg text-white flex flex-col justify-center items-center text-center">
              <Download size={32} className="mb-4 opacity-80" />
              <h3 className="text-lg font-bold mb-2">Butuh Template?</h3>
              <p className="text-sm text-indigo-100 mb-6">
                Unduh format surat permohonan dan manual SJPH resmi di website
                BPJPH.
              </p>
              <ButtonCustom
                href="https://bpjph.halal.go.id/detail/informasi-1"
                variant="secondary"
                size="sm"
                className="w-full justify-center bg-white text-indigo-600 hover:bg-indigo-50"
              >
                Unduh Format <ExternalLink size={14} />
              </ButtonCustom>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: CTA --- */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Sudah Melengkapi Semua Persyaratan?
          </h2>
          <p className="text-slate-500 mb-8">
            Segera daftarkan akun Anda di SIHALAL dan pilih{" "}
            <strong>LPH UIN Raden Fatah</strong> sebagai mitra pemeriksaan Anda.
          </p>
          <ButtonCustom
            href="https://ptsp.halal.go.id"
            size="lg"
            className="shadow-xl shadow-purple-200"
          >
            Daftar Sekarang di SIHALAL
          </ButtonCustom>
        </div>
      </section>
    </>
  );
}

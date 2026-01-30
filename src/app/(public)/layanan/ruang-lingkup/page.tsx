"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import {
  Utensils,
  Coffee,
  Package, // Barang Gunaan
  Truck,
  Sparkles,
  Beef,
  Download,
  FileText,
  CheckCircle2,
  UploadCloud,
  LayoutTemplate,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- DATA PERSYARATAN (Sesuai gambar sebelumnya) ---
const REGULER_REQUIREMENTS = [
  {
    id: 1,
    doc: "Surat Permohonan Sertifikat Halal",
    desc: "Generate secara otomatis di SIHalal",
    type: "generate",
  },
  {
    id: 2,
    doc: "Formulir Pendaftaran Jasa Penyembelihan",
    desc: "Diunggah di SIHalal (Jika ada)",
    type: "upload",
  },
  {
    id: 3,
    doc: "Aspek Legal: NIB",
    desc: "Diunggah di SIHalal pada saat membuat akun",
    type: "upload",
  },
  {
    id: 4,
    doc: "Dokumen Penyelia Halal",
    details: [
      "Penetapan Penyelia Halal (Generate otomatis)",
      "Salinan KTP (Upload)",
      "Daftar Riwayat Hidup (Generate otomatis)",
      "Sertifikat Pelatihan/Kompetensi (Upload)",
    ],
    desc: "Kombinasi upload dan generate sistem",
    type: "mixed",
  },
  {
    id: 5,
    doc: "Nama produk, Matriks Bahan & Daftar Bahan",
    desc: "Mengisi data di SIHalal",
    type: "input",
  },
  {
    id: 6,
    doc: "Proses Produksi Halal",
    desc: "Mengisi data di SIHalal",
    type: "input",
  },
  {
    id: 7,
    doc: "Manual SJPH",
    desc: "Mengisi/Upload (Akan di-Generate otomatis)",
    type: "mixed",
  },
  {
    id: 8,
    doc: "Sertifikat Pelatihan/Kompetensi Juleha",
    desc: "Diunggah di SIHalal",
    type: "upload",
  },
  {
    id: 9,
    doc: "Dokumen Tambahan Pelaku Usaha LN",
    desc: "Diunggah di SIHalal",
    type: "upload",
  },
];

// --- DATA RUANG LINGKUP (6 ITEM) ---
const SCOPES = [
  {
    icon: Utensils,
    title: "Makanan",
    description: "Produk olahan pangan siap saji maupun kemasan.",
    type: "modal",
  },
  {
    icon: Coffee,
    title: "Minuman",
    description: "Minuman olahan dan serbuk bebas khamr.",
    type: "modal",
  },
  {
    icon: Package,
    title: "Barang Gunaan",
    description: "Perlengkapan rumah tangga, sandang, dll.",
    type: "modal",
  },
  {
    icon: Truck,
    title: "Distribusi",
    description: "Jasa logistik, pergudangan, dan retail.",
    type: "modal",
  },
  {
    icon: Sparkles,
    title: "Kosmetik",
    description: "Produk kecantikan dan perawatan tubuh.",
    type: "modal",
  },
  {
    icon: Beef,
    title: "Rumah Potong Hewan",
    description: "Jasa penyembelihan (RPH/RPU).",
    type: "download", // Special type
    fileUrl: "/files/juknis-rph.pdf", // Pastikan file ini ada di folder public/files/
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

      <section className="py-10 md:py-20 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {SCOPES.map((item, index) => {
              const Icon = item.icon;
              const isDownload = item.type === "download";

              // KONTEN KARTU (Reusable)
              const CardContent = () => (
                <div
                  className={cn(
                    "group relative h-[200px] md:h-[260px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-6 text-center",
                    isDownload
                      ? "hover:border-green-200"
                      : "hover:border-indigo-200",
                  )}
                >
                  {/* Background Hover Effect */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-0",
                      isDownload ? "bg-green-50" : "bg-indigo-50",
                    )}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    {/* Icon */}
                    <div
                      className={cn(
                        "mb-4 p-3 md:p-4 rounded-full transition-all duration-500 group-hover:scale-110",
                        isDownload
                          ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                          : "bg-indigo-50 text-indigo-600 group-hover:bg-white group-hover:shadow-md",
                      )}
                    >
                      {isDownload ? (
                        <Download size={32} strokeWidth={1.5} />
                      ) : (
                        <Icon size={32} strokeWidth={1.5} />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm md:text-xl font-bold text-slate-800 mb-2">
                      {item.title}
                    </h3>

                    {/* Description / Action Text */}
                    <p className="text-xs md:text-sm text-slate-500 max-w-[200px] group-hover:text-slate-700 transition-colors">
                      {isDownload
                        ? "Klik untuk Unduh Juknis"
                        : item.description}
                    </p>
                  </div>

                  {/* Icon Indikator Pojok (Optional) */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isDownload ? (
                      <FileText size={16} className="text-green-500" />
                    ) : (
                      <FileText size={16} className="text-indigo-500" />
                    )}
                  </div>
                </div>
              );

              // 1. JIKA TIPE DOWNLOAD (RPH) -> RENDER LINK A
              if (isDownload) {
                return (
                  <a
                    key={index}
                    href={item.fileUrl}
                    download
                    className="block"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CardContent />
                  </a>
                );
              }

              // 2. JIKA TIPE MODAL -> RENDER DIALOG
              return (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div>
                      {" "}
                      {/* Div wrapper diperlukan untuk DialogTrigger */}
                      <CardContent />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                    <DialogHeader className="px-6 py-6 border-b bg-slate-50/50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                          <Icon size={24} />
                        </div>
                        <div>
                          <DialogTitle className="text-xl md:text-2xl font-bold text-slate-900">
                            Persyaratan Dokumen: {item.title}
                          </DialogTitle>
                          <DialogDescription className="text-slate-500 mt-1">
                            Daftar dokumen yang harus dipenuhi untuk pengajuan
                            Sertifikasi Halal Reguler.
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>

                    {/* SCROLL AREA UNTUK TABEL */}
                    <ScrollArea className="h-full max-h-[60vh] md:max-h-[600px] p-6">
                      <div className="rounded-xl border border-slate-200 overflow-hidden">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="bg-slate-900 text-white">
                              <th className="p-4 w-12 text-center font-medium">
                                No
                              </th>
                              <th className="p-4 font-medium">Jenis Dokumen</th>
                              <th className="p-4 w-1/3 font-medium hidden md:table-cell">
                                Keterangan & Metode
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {REGULER_REQUIREMENTS.map((req) => (
                              <tr
                                key={req.id}
                                className="hover:bg-slate-50 transition-colors"
                              >
                                <td className="p-4 text-center font-bold text-slate-400 align-top">
                                  {req.id}
                                </td>
                                <td className="p-4 align-top">
                                  <div className="font-semibold text-slate-800 text-base mb-1">
                                    {req.doc}
                                  </div>
                                  {/* Sub-details list */}
                                  {req.details && (
                                    <ul className="list-disc list-inside space-y-1 ml-1 text-slate-600 text-xs md:text-sm mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                      {req.details.map((d, i) => (
                                        <li key={i}>{d}</li>
                                      ))}
                                    </ul>
                                  )}
                                  {/* Mobile View: Keterangan muncul disini */}
                                  <div className="md:hidden mt-3">
                                    <StatusBadge
                                      type={req.type}
                                      text={req.desc}
                                    />
                                  </div>
                                </td>
                                <td className="p-4 hidden md:table-cell align-top">
                                  <StatusBadge
                                    type={req.type}
                                    text={req.desc}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Catatan Kaki */}
                      <div className="mt-6 bg-yellow-50 text-yellow-800 p-4 rounded-lg text-xs md:text-sm border border-yellow-100 flex gap-3">
                        <FileText className="shrink-0 w-5 h-5" />
                        <p>
                          Pastikan seluruh dokumen dalam format digital
                          (PDF/JPG) yang jelas dan terbaca sebelum melakukan
                          upload di sistem SIHALAL.
                        </p>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// --- SUB COMPONENT: BADGE STATUS (Untuk Tabel) ---
function StatusBadge({ type, text }: { type: string; text: string }) {
  let badgeClass = "";
  let Icon = FileText;

  switch (type) {
    case "generate":
      badgeClass =
        "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
      Icon = CheckCircle2;
      break;
    case "upload":
      badgeClass =
        "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100";
      Icon = UploadCloud;
      break;
    case "input":
      badgeClass =
        "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100";
      Icon = LayoutTemplate;
      break;
    default:
      badgeClass = "bg-slate-100 text-slate-700 border-slate-200";
      break;
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <Badge variant="outline" className={cn("gap-1.5 pl-2 pr-3", badgeClass)}>
        <Icon size={12} />
        <span className="capitalize">
          {type === "mixed" ? "Campuran" : type}
        </span>
      </Badge>
      <span className="text-xs text-slate-500 leading-snug">{text}</span>
    </div>
  );
}

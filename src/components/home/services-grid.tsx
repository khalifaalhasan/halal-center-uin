"use client";

import { SectionHeader } from "../ui/section-header";
import { motion } from "framer-motion";
import {
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

// --- IMPORT DATA CENTRAL ---
import { SCOPES, REGULER_REQUIREMENTS } from "@/constants/service-data";

// --- VARIAN ANIMASI ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 12 },
  },
};

export default function ServicesGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12">
          <SectionHeader
            badge="Layanan Kami"
            title={
              <>
                Lingkup <span className="text-primary">Layanan Halal</span>
              </>
            }
            subtitle="Pemeriksaan dan sertifikasi komprehensif untuk berbagai kategori produk."
          />
        </div>

        {/* GRID CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
        >
          {SCOPES.map((item, index) => {
            const Icon = item.icon;
            const isDownload = item.type === "download";

            // --- KARTU LAYANAN (CARD UI) ---
            const CardContent = (
              <div
                className={cn(
                  "group relative h-[200px] md:h-[240px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-6 text-center",
                  isDownload
                    ? "hover:border-green-200"
                    : "hover:border-indigo-200"
                )}
              >
                 {/* Hover BG */}
                 <div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-0",
                      isDownload ? "bg-green-50" : "bg-indigo-50"
                    )}
                  />

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={cn(
                      "mb-4 p-3 md:p-4 rounded-full transition-all duration-500 group-hover:scale-110",
                      isDownload
                        ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                        : "bg-indigo-50 text-indigo-600 group-hover:bg-white group-hover:shadow-md"
                    )}
                  >
                    {isDownload ? (
                      <Download size={28} strokeWidth={1.5} />
                    ) : (
                      <Icon size={28} strokeWidth={1.5} />
                    )}
                  </div>

                  <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors line-clamp-2">
                    {isDownload ? "Unduh Juknis RPH" : item.description}
                  </p>
                </div>
              </div>
            );

            // --- LOGIKA RENDER (Download / Dialog) ---
            return (
              <motion.div key={index} variants={itemVariants}>
                {isDownload ? (
                  // Link Download
                  <a
                    href={item.fileUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full"
                  >
                    {CardContent}
                  </a>
                ) : (
                  // Dialog Modal
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="h-full">{CardContent}</div>
                    </DialogTrigger>
                    
                    {/* CONTENT DIALOG (Sama dengan Page Layanan) */}
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                      <DialogHeader className="px-6 py-6 border-b bg-slate-50/50">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                            <Icon size={24} />
                          </div>
                          <div>
                            <DialogTitle className="text-xl md:text-2xl font-bold text-slate-900">
                              Persyaratan: {item.title}
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 mt-1">
                              Dokumen persyaratan sertifikasi halal reguler.
                            </DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>

                      <ScrollArea className="h-full max-h-[60vh] md:max-h-[500px] p-6">
                         <div className="rounded-xl border border-slate-200 overflow-hidden">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="bg-slate-900 text-white">
                                <th className="p-4 w-12 text-center font-medium">No</th>
                                <th className="p-4 font-medium">Jenis Dokumen</th>
                                <th className="p-4 w-1/3 font-medium hidden md:table-cell">Keterangan</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {REGULER_REQUIREMENTS.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50">
                                  <td className="p-4 text-center font-bold text-slate-400 align-top">{req.id}</td>
                                  <td className="p-4 align-top">
                                    <div className="font-semibold text-slate-800 mb-1">{req.doc}</div>
                                    {req.details && (
                                      <ul className="list-disc list-inside space-y-1 ml-1 text-slate-600 text-xs mt-2 bg-slate-50 p-2 rounded">
                                        {req.details.map((d, i) => <li key={i}>{d}</li>)}
                                      </ul>
                                    )}
                                    <div className="md:hidden mt-2">
                                       <StatusBadge type={req.type} text={req.desc} />
                                    </div>
                                  </td>
                                  <td className="p-4 hidden md:table-cell align-top">
                                    <StatusBadge type={req.type} text={req.desc} />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-6 bg-yellow-50 text-yellow-800 p-4 rounded-lg text-xs md:text-sm flex gap-3">
                          <FileText className="shrink-0 w-5 h-5" />
                          <p>Dokumen harus dalam format digital (PDF/JPG) yang jelas.</p>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// --- SUB COMPONENT (Sama persis) ---
function StatusBadge({ type, text }: { type: string; text: string }) {
  let badgeClass = "";
  let Icon = FileText;

  switch (type) {
    case "generate":
      badgeClass = "bg-emerald-100 text-emerald-700 border-emerald-200";
      Icon = CheckCircle2;
      break;
    case "upload":
      badgeClass = "bg-blue-100 text-blue-700 border-blue-200";
      Icon = UploadCloud;
      break;
    case "input":
      badgeClass = "bg-orange-100 text-orange-700 border-orange-200";
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
        <span className="capitalize">{type === "mixed" ? "Campuran" : type}</span>
      </Badge>
      <span className="text-xs text-slate-500 leading-snug">{text}</span>
    </div>
  );
}
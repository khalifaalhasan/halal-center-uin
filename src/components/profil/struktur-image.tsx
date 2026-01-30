"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Maximize2 } from "lucide-react";

export default function StrukturImage() {
  const [isOpen, setIsOpen] = useState(false);

  // Pastikan path ini sama persis dengan yang muncul di popup
  const IMAGE_PATH = "/images/struktur-organisasi.png";

  return (
    <>
      {/* --- THUMBNAIL VIEW (Perbaikan Layout) --- */}
      <div
        className="w-full flex justify-center"
        onClick={() => setIsOpen(true)}
      >
        {/* Kita hapus motion.div di wrapper luar untuk menghindari bug opacity.
            Gunakan class 'group' dan 'relative' untuk hover effect.
        */}
        <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-slate-50 cursor-zoom-in group">
          {/* TRICK: Berikan min-height agar container tidak gepeng (height 0) 
             sebelum gambar dimuat.
          */}
          <div className="min-h-[200px] w-full bg-slate-100 flex items-center justify-center">
            <img
              src={IMAGE_PATH}
              alt="Struktur Organisasi Halal Center"
              className="w-full h-auto object-contain block"
              // 'block' penting untuk menghilangkan celah bawah pada img
            />
          </div>

          {/* Overlay Hint (Desktop) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
              <ZoomIn className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-slate-700">
                Klik untuk Perbesar
              </span>
            </div>
          </div>

          {/* Mobile Hint */}
          <div className="absolute bottom-3 right-3 md:hidden">
            <div className="bg-white/80 p-2 rounded-full shadow-sm text-slate-600">
              <Maximize2 size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL LIGHTBOX (Tidak berubah karena sudah works) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setIsOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-7xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={IMAGE_PATH}
                alt="Struktur Full"
                className="w-full h-full object-contain max-h-[90vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

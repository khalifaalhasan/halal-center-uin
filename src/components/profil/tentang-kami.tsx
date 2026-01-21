"use client"; // Wajib untuk Framer Motion

import Image from "next/image";
import { motion } from "framer-motion"; // 1. Import Motion

// --- VARIAN ANIMASI ---
const imageVariant = {
  hidden: { opacity: 0, x: -50 }, // Foto mulai dari kiri
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const textContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Text muncul satu per satu
    },
  },
};

const textItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function TentangKamiPage() {
  return (
    <>
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 1. Image Section (Animasi Masuk dari Kiri) */}
            <motion.div
              className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }} // Animasi ulang saat scroll
              variants={imageVariant}
            >
              <Image
                src="/images/logolph.png"
                alt="Gedung LPH UIN Raden Fatah"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* 2. Text Content (Animasi Staggered) */}
            <motion.div
              className="space-y-6"
              variants={textContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }} // Animasi ulang saat scroll
            >
              <motion.h2
                variants={textItemVariant}
                className="text-3xl font-bold text-slate-900"
              >
                Dedikasi untuk{" "}
                <span className="text-primary-purple">Umat & Industri</span>
              </motion.h2>

              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <motion.p variants={textItemVariant}>
                  Lembaga Pemeriksa Halal (LPH) UIN Raden Fatah Palembang
                  didirikan sebagai wujud komitmen universitas dalam mendukung
                  implementasi Jaminan Produk Halal di Indonesia sesuai dengan
                  amanat Undang-Undang No. 33 Tahun 2014.
                </motion.p>
                <motion.p variants={textItemVariant}>
                  Didukung oleh auditor bersertifikat yang memiliki latar
                  belakang keilmuan pangan, kimia, biologi, dan syariah, kami
                  siap melayani pemeriksaan kehalalan produk bagi pelaku usaha
                  mikro, kecil, menengah, hingga industri besar.
                </motion.p>
                <motion.p variants={textItemVariant}>
                  Kami percaya bahwa sertifikasi halal bukan hanya soal
                  kepatuhan regulasi, tetapi juga memberikan nilai tambah (value
                  added) dan jaminan ketenangan batin bagi konsumen.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

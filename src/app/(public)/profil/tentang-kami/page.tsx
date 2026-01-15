import { PageHeader } from "@/components/ui/page-header";
import Image from "next/image";

export default function TentangKamiPage() {
  return (
    <>
      <PageHeader
        title="Tentang Kami"
        description="Mengenal lebih dekat LPH UIN Raden Fatah Palembang."
        breadcrumbs={[{ label: "Profil" }, { label: "Tentang Kami" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/logolph.png" // Ganti dengan foto gedung/tim asli
                alt="Gedung LPH UIN Raden Fatah"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">
                Dedikasi untuk{" "}
                <span className="text-primary-purple">Umat & Industri</span>
              </h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  Lembaga Pemeriksa Halal (LPH) UIN Raden Fatah Palembang
                  didirikan sebagai wujud komitmen universitas dalam mendukung
                  implementasi Jaminan Produk Halal di Indonesia sesuai dengan
                  amanat Undang-Undang No. 33 Tahun 2014.
                </p>
                <p>
                  Didukung oleh auditor bersertifikat yang memiliki latar
                  belakang keilmuan pangan, kimia, biologi, dan syariah, kami
                  siap melayani pemeriksaan kehalalan produk bagi pelaku usaha
                  mikro, kecil, menengah, hingga industri besar.
                </p>
                <p>
                  Kami percaya bahwa sertifikasi halal bukan hanya soal
                  kepatuhan regulasi, tetapi juga memberikan nilai tambah (value
                  added) dan jaminan ketenangan batin bagi konsumen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

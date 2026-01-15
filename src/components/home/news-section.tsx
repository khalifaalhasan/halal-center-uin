import { DUMMY_NEWS } from "@/constants/data";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ButtonCustom } from "@/components/ui/button-custom";
import { SectionHeader } from "@/components/ui/section-header";

export default function NewsSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- IMPLEMENTASI HEADER BARU --- */}
        {/* Karena ada linkHref, dia akan otomatis Rata Kiri di Desktop */}
        <SectionHeader
          badge="Wawasan & Informasi"
          title={
            <>
              Kabar Terbaru dari <br className="hidden md:block" />
              <span className="text-primary">LPH UIN Raden Fatah</span>
            </>
          }
          linkHref="/berita"
          linkText="Lihat Semua Berita"
        />

        {/* --- NEWS GRID / CAROUSEL (Sama seperti sebelumnya) --- */}
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:gap-8 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {DUMMY_NEWS.map((news) => (
            <article
              key={news.id}
              className="flex-shrink-0 w-[85vw] md:w-auto snap-center group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary-purple shadow-sm">
                  {news.category}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
                <div className="flex items-center gap-4 text-slate-400 text-xs mb-3 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} /> {news.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} /> 3 Min Read
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-purple transition-colors line-clamp-2 leading-snug">
                  <Link href={`/berita/${news.id}`}>{news.title}</Link>
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">
                  {news.excerpt}
                </p>

                <Link
                  href={`/berita/${news.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary-purple group/btn mt-auto"
                >
                  Baca Selengkapnya
                  <ChevronRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Tombol Mobile (Visible only on Mobile) */}
        <div className="mt-6 md:hidden text-center">
          <ButtonCustom
            href="/berita"
            variant="secondary"
            size="sm"
            className="w-full justify-center"
          >
            Lihat Semua Berita
          </ButtonCustom>
        </div>
      </div>
    </section>
  );
}

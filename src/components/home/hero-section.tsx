import branding from "@/constants/branding.json";

export default function HeroSection() {
  return (
    // REFACTOR: Padding dikurangi agar lebih compact (Laptop: pt-36, Mobile: pt-28)
    <section className="relative pt-28 pb-10 lg:pt-36 lg:pb-14 overflow-hidden bg-white">
      {/* Background Dot Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(#6366f1 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge Branding - Margin bottom dikurangi (mb-6) */}
        <div className="inline-flex items-center gap-2 bg-secondary-purple/30 border border-primary/20 px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-6 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest">
            Sistem Informasi Resmi {branding.brand.shortName}
          </span>
        </div>

        {/* Heading Utama - Ukuran font disesuaikan (Laptop: text-6xl, Mobile: text-3xl) */}
        {/* Leading diperketat agar baris tidak terlalu jauh */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          {branding.brand.name} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
            {branding.brand.secondary}
          </span>
        </h1>

        {/* Sub-Heading - Ukuran font sedikit dikecilkan untuk estetika compact */}
        <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-2 px-4">
          Kami hadir untuk memastikan produk Anda aman, suci, dan sesuai standar
          syariat. Pastikan memilih{" "}
          <strong className="text-slate-900 font-bold">
            {branding.brand.shortName}
          </strong>{" "}
          saat mendaftar.
        </p>
      </div>

      {/* Efek Gradasi Bawah untuk transisi mulus ke section berikutnya */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}

export function DisconnectIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // ClassName ini akan menerima warna text dari parent (text-primary atau text-destructive)
      className={className}
    >
      {/* Background Circle - Tetap abu-abu netral */}
      <circle cx="200" cy="150" r="100" className="fill-slate-100" />

      {/* GRUP UTAMA: Kabel & Colokan (Menggunakan currentColor) */}
      {/* 'text-current' memastikan fill dan stroke mengikuti warna teks parent */}
      <g className="text-current" stroke="currentColor" fill="currentColor">
        {/* KABEL KIRI (Bawah) */}
        <path
          d="M50 220 H 130 Q 150 220 150 200 V 160"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none" // Path kabel tidak butuh fill
        />
        {/* Kepala Colokan Kiri (Male) */}
        <rect x="135" y="130" width="30" height="30" rx="4" stroke="none" />
        <path d="M142 130 V 115" strokeWidth="4" fill="none" />
        <path d="M158 130 V 115" strokeWidth="4" fill="none" />

        {/* KABEL KANAN (Atas) */}
        <path
          d="M350 80 H 270 Q 250 80 250 100 V 140"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        {/* Kepala Colokan Kanan (Female) */}
        <path d="M235 140 H 265 V 170 H 235 Z" stroke="none" />
        <rect x="235" y="140" width="30" height="35" rx="4" stroke="none" />
      </g>

      {/* Efek Putus / Sparks (Menggunakan currentColor dengan opacity biar agak beda dikit) */}
      <g
        className="text-current opacity-60"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M180 120 L 170 110" />
        <path d="M220 120 L 230 110" />
        <path d="M180 180 L 170 190" />
        <path d="M220 180 L 230 190" />
      </g>
    </svg>
  );
}

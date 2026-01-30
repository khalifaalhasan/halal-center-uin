export interface navItem {
  name: string;
  href: string;
  isExternal?: boolean; // <--- Tanda tanya (?) artinya opsional
  submenu?: navItem[];
}

export const navLinks: navItem[] = [
  { name: "Beranda", href: "/" },
  {
    name: "Tentang Kami",
    href: "/tentang-kami",
  },

  {
    name: "Layanan",
    href: "/layanan",
    // Menambahkan submenu untuk dropdown
    submenu: [
      { name: "LPH (Ruang Lingkup)", href: "/layanan/ruang-lingkup" },
      {
        name: "LP3H",
        href: "https://bpjph.halal.go.id/data-rekapitulasi-sehati/",
        isExternal: true,
      },
      // { name: "Kalkulator Biaya", href: "/layanan/kalkulator-biaya" },
      {
        name: "Formulir Layanan",
        href: "https://bpjph.halal.go.id/detail/informasi-1",
        isExternal: true,
      },
    ],
  },
  { name: "Prosedur", href: "/prosedur" },
  { name: "Blog", href: "/blog" },
];

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
      { name: "Ruang Lingkup", href: "/layanan/ruang-lingkup" },
      { name: "Daftar Pelaku Usaha", href: "/layanan/daftar-pelaku-usaha" },
      { name: "Kalkulator Biaya", href: "/layanan/kalkulator-biaya" },
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

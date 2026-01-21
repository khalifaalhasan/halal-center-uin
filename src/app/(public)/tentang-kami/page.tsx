import StrukturOrganisasiPage from "@/components/profil/struktur-organisasi";
import TentangKamiPage from "@/components/profil/tentang-kami";
import VisiMisiPage from "@/components/profil/visi-misi";
import { PageHeader } from "@/components/ui/page-header";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tentang Kami",

  description:
    "Profil lengkap, visi misi, dan sejarah LPH UIN Raden Fatah Palembang. Kami berkomitmen menjadi Lembaga Pemeriksa Halal yang terpercaya, profesional, dan akuntabel di Sumatera Selatan.",

  openGraph: {
    title: "Tentang Kami - Profil LPH UIN Raden Fatah",
    description:
      "Mengenal lebih dekat visi, misi, dan dedikasi kami dalam menjamin kehalalan produk bagi masyarakat.",
  },
};

export default async function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Profil LPH"
        description="Tentang Halal Center"
        breadcrumbs={[{ label: "Profil" }]}
      />
      <TentangKamiPage />
      <VisiMisiPage />
      <StrukturOrganisasiPage />
    </>
  );
}

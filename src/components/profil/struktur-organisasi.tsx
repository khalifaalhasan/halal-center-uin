import { getOrganizationTree } from "@/services/organization-service";
import { SectionHeader } from "../ui/section-header";
import OrgChartViewer from "../client/org-chart-view";

export const dynamic = "force-dynamic";

export default async function StrukturOrganisasiPage() {
  // 1. FETCH DATA DARI DB
  const orgData = await getOrganizationTree();

  return (
    <div className="py-20 bg-white min-h-screen">
      {/* Container utama diberi warna background sedikit */}

      <SectionHeader
        badge="Struktur Organisasi"
        title={
          <>
            Pimpinan <span className="text-primary">Halal Center</span>
          </>
        }
        subtitle="Susunan pengurus LPH UIN Raden Fatah."
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Panggil Client Component untuk render dan animasi */}
          <OrgChartViewer orgData={orgData} />
        </div>
      </section>
    </div>
  );
}

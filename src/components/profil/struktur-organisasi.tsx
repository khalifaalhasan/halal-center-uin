import { PageHeader } from "@/components/ui/page-header";
import { UserCircle2, CornerDownRight } from "lucide-react";
// Import Service & Tipe Data
import {
  getOrganizationTree,
  OrgMember,
} from "@/services/organization-service";
import { SectionHeader } from "../ui/section-header";

// ==========================================
// 1. DESKTOP COMPONENT (Tidak Berubah)
// ==========================================
const DesktopOrgNode = ({ member }: { member: OrgMember }) => {
  return (
    <div className="flex flex-col items-center">
      {/* CARD DESKTOP */}
      <div className="relative z-10 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-xl flex items-center gap-3 p-3 w-[200px]">
        <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-300 overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserCircle2 size={24} />
          )}
        </div>
        <div className="overflow-hidden">
          <h3
            className="font-bold text-slate-800 text-xs leading-tight truncate"
            title={member.name}
          >
            {member.name}
          </h3>
          <p className="font-semibold text-primary-purple text-[10px] uppercase tracking-wide truncate mt-0.5">
            {member.role}
          </p>
        </div>
      </div>

      {/* CONNECTOR LINES DESKTOP */}
      {member.children && member.children.length > 0 && (
        <>
          <div className="w-px h-6 bg-slate-300"></div>
          <div className="flex justify-center relative">
            {member.children.length > 1 && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] border-t border-slate-300"></div>
            )}
            <div className="flex gap-6 pt-0">
              {member.children.map((child) => (
                <div
                  key={child.id}
                  className="flex flex-col items-center relative"
                >
                  <div className="w-px h-6 bg-slate-300"></div>
                  <DesktopOrgNode member={child} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ==========================================
// 2. MOBILE COMPONENT (Tidak Berubah)
// ==========================================
const MobileOrgNode = ({
  member,
  isRoot = false,
}: {
  member: OrgMember;
  isRoot?: boolean;
}) => {
  return (
    <div className="w-full">
      {/* CARD MOBILE */}
      <div
        className={`relative flex items-center gap-3 bg-white border border-slate-100 shadow-sm rounded-lg p-3 w-full mb-3
        ${isRoot ? "bg-indigo-50/50 border-indigo-100" : ""}`}
      >
        <div className="shrink-0 w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-indigo-300 overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserCircle2 size={20} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 text-xs truncate">
            {member.name}
          </h3>
          <p className="font-medium text-primary-purple text-[10px] uppercase tracking-wide truncate">
            {member.role}
          </p>
        </div>
      </div>

      {/* CHILDREN */}
      {member.children && member.children.length > 0 && (
        <div className="pl-4 ml-4 border-l-2 border-slate-100 border-dashed space-y-1">
          {member.children.map((child) => (
            <div key={child.id} className="relative pt-2">
              <div className="absolute left-[-17px] top-[22px] w-4 h-px bg-slate-200"></div>
              <MobileOrgNode member={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// MAIN PAGE (Server Component)
// ==========================================
export const dynamic = "force-dynamic"; // Biar selalu fetch data terbaru

export default async function StrukturOrganisasiPage() {
  // 1. FETCH DATA DARI DB
  const orgData = await getOrganizationTree();

  return (
    <div className="py-30">
      <SectionHeader
        badge="Struktur Organisasi"
        title={
          <>
            Pimpinan <span className="text-primary">Halal Center</span>
          </>
        }
        subtitle="usunan pengurus LPH UIN Raden Fatah."
      />

      <section className="py-12 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Kondisi jika data ada */}
          {orgData ? (
            <>
              {/* --- TAMPILAN MOBILE --- */}
              <div className="md:hidden">
                <div className="max-w-md mx-auto">
                  <MobileOrgNode member={orgData} isRoot={true} />
                </div>
              </div>

              {/* --- TAMPILAN DESKTOP --- */}
              <div className="hidden md:flex justify-center overflow-x-auto pb-10">
                <div className="min-w-fit px-4">
                  <DesktopOrgNode member={orgData} />
                </div>
              </div>
            </>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <UserCircle2 size={48} className="mb-4 text-slate-200" />
              <p>Struktur organisasi belum diatur.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

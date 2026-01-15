import { PageHeader } from "@/components/ui/page-header";
import { ORGANIZATION_DATA, OrgMember } from "@/constants/organizations";
import { UserCircle2, CornerDownRight } from "lucide-react";

// ==========================================
// 1. DESKTOP COMPONENT (Horizontal Tree)
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
          {/* Garis Vertikal Pendek */}
          <div className="w-px h-6 bg-slate-300"></div>

          <div className="flex justify-center relative">
            {/* Garis Horizontal */}
            {member.children.length > 1 && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] border-t border-slate-300"></div>
            )}

            <div className="flex gap-6 pt-0">
              {member.children.map((child, index) => (
                <div
                  key={index}
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
// 2. MOBILE COMPONENT (Vertical List)
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
      {/* CARD MOBILE (Full Width) */}
      <div
        className={`relative flex items-center gap-3 bg-white border border-slate-100 shadow-sm rounded-lg p-3 w-full mb-3
        ${isRoot ? "bg-indigo-50/50 border-indigo-100" : ""}`}
      >
        {/* Icon/Avatar */}
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

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 text-xs truncate">
            {member.name}
          </h3>
          <p className="font-medium text-primary-purple text-[10px] uppercase tracking-wide truncate">
            {member.role}
          </p>
        </div>
      </div>

      {/* CHILDREN RENDERING (Nested Vertical) */}
      {member.children && member.children.length > 0 && (
        <div className="pl-4 ml-4 border-l-2 border-slate-100 border-dashed space-y-1">
          {member.children.map((child, index) => (
            <div key={index} className="relative pt-2">
              {/* Garis siku L (Connector visual) */}
              <div className="absolute left-[-17px] top-[22px] w-4 h-px bg-slate-200"></div>
              {/* <CornerDownRight className="absolute -left-5 top-3 text-slate-300" size={16} /> */}

              <MobileOrgNode member={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// MAIN PAGE
// ==========================================
export default function StrukturOrganisasiPage() {
  return (
    <>
      <PageHeader
        title="Struktur Organisasi"
        description="Susunan pengurus LPH UIN Raden Fatah."
        breadcrumbs={[{ label: "Profil" }, { label: "Struktur Organisasi" }]}
      />

      <section className="py-12 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          {/* --- TAMPILAN MOBILE (Vertical) --- */}
          <div className="md:hidden">
            {/* Container max-width biar ga terlalu lebar di tablet mode portrait */}
            <div className="max-w-md mx-auto">
              <MobileOrgNode member={ORGANIZATION_DATA} isRoot={true} />
            </div>
          </div>

          {/* --- TAMPILAN DESKTOP (Horizontal Tree) --- */}
          <div className="hidden md:flex justify-center overflow-x-auto pb-10">
            <div className="min-w-fit px-4">
              <DesktopOrgNode member={ORGANIZATION_DATA} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

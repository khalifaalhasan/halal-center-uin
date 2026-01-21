"use client"; // Wajib untuk Framer Motion

import { UserCircle2 } from "lucide-react";
import { OrgMember } from "@/services/organization-service"; // Pastikan path import type benar
import { motion } from "framer-motion";

// --- VARIAN ANIMASI ---
const cardVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring" as const, stiffness: 120 },
  },
};

const mobileRowVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// ==========================================
// 1. DESKTOP NODE (Recursive + Animated)
// ==========================================
const DesktopOrgNode = ({ member }: { member: OrgMember }) => {
  return (
    <div className="flex flex-col items-center">
      {/* CARD DESKTOP */}
      <motion.div
        className="relative z-10 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-xl flex items-center gap-3 p-3 w-[200px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }} // Animasi ulang saat scroll
        variants={cardVariant}
      >
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
        <div className="overflow-hidden text-left">
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
      </motion.div>

      {/* CONNECTOR LINES DESKTOP */}
      {member.children && member.children.length > 0 && (
        <>
          {/* Garis Vertikal Turun */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "1.5rem" }} // h-6 = 1.5rem
            viewport={{ once: false }}
            transition={{ duration: 0.4 }}
            className="w-px bg-slate-300 origin-top"
          ></motion.div>

          <div className="flex justify-center relative">
            {/* Garis Horizontal Penghubung */}
            {member.children.length > 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] border-t border-slate-300"
              ></motion.div>
            )}

            <div className="flex gap-6 pt-0">
              {member.children.map((child) => (
                <div
                  key={child.id}
                  className="flex flex-col items-center relative"
                >
                  {/* Garis Vertikal ke Anak */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "1.5rem" }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3 }}
                    className="w-px bg-slate-300 origin-top"
                  ></motion.div>
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
// 2. MOBILE NODE (Recursive + Animated)
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
      <motion.div
        className={`relative flex items-center gap-3 bg-white border border-slate-100 shadow-sm rounded-lg p-3 w-full mb-3
        ${isRoot ? "bg-indigo-50/50 border-indigo-100" : ""}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // Animasi ulang saat scroll
        variants={mobileRowVariant}
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
      </motion.div>

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
// MAIN CLIENT COMPONENT
// ==========================================
export default function OrgChartViewer({
  orgData,
}: {
  orgData: OrgMember | null;
}) {
  if (!orgData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <UserCircle2 size={48} className="mb-4 text-slate-200" />
        <p>Struktur organisasi belum diatur.</p>
      </div>
    );
  }

  return (
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
  );
}

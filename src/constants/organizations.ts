// src/constants/organization.ts

export interface OrgMember {
  name: string;
  role: string;
  image?: string;
  children?: OrgMember[];
}

export const ORGANIZATION_DATA: OrgMember = {
  name: "Prof. Dr. Nyayu Khodijah",
  role: "Rektor / Penanggung Jawab",
  children: [
    {
      name: "Dr. Irham Falahudin, M.Si.",
      role: "Ketua LPH",
      children: [
        {
          name: "Dr. Yulia Tri Samiha",
          role: "Manajer Mutu",
        },
        {
          name: "Dr. Rr. Rina Antasari",
          role: "Manajer Administrasi",
          children: [
            { name: "Staff Admin 1", role: "Staff Admin" },
            { name: "Staff Admin 2", role: "Staff Keuangan" },
          ],
        },
        {
          name: "Dr. Muhammad Isnaini",
          role: "Manajer Teknis",
          children: [
            { name: "Tim Auditor", role: "Auditor Halal" },
            { name: "Tim Auditor", role: "Auditor Halal" },
          ],
        },
      ],
    },
  ],
};
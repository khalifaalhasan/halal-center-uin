import { prisma } from "@/lib/prisma";

export interface OrgMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
  children: OrgMember[];
}

// 1. Fetch Tree (Filter yang belum dihapus)
export async function getOrganizationTree(): Promise<OrgMember | null> {
  const allMembers = await prisma.teamMember.findMany({
    where: { deletedAt: null }, // 👈 FILTER SOFT DELETE
    orderBy: { order: "asc" },
  });

  if (allMembers.length === 0) return null;

  const buildTree = (parentId: string | null): OrgMember[] => {
    return allMembers
      .filter((member) => member.parentId === parentId)
      .map((member) => ({
        id: member.id,
        name: member.name,
        role: member.role,
        image: member.image,
        children: buildTree(member.id),
      }));
  };

  const rootMember = allMembers.find((m) => m.parentId === null);
  if (!rootMember) return null;

  return {
    id: rootMember.id,
    name: rootMember.name,
    role: rootMember.role,
    image: rootMember.image,
    children: buildTree(rootMember.id),
  };
}

// 2. Fetch Flat List (Filter yang belum dihapus)
export async function getAllMembersFlat() {
  return await prisma.teamMember.findMany({
    where: { deletedAt: null }, // 👈 FILTER SOFT DELETE
    orderBy: { name: "asc" },
    select: { id: true, name: true, role: true },
  });
}

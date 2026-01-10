import { prisma } from "@/lib/prisma";
import { Service } from "@/types"

export async function getServices(): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        order: 'asc',

      },

      select: {
        id: true,
        title: true,
        description: true,
        icon: true,
      }
    });
    return services;
  } catch (error) {
    console.error("Database Error", error);
    return [];
  }
}
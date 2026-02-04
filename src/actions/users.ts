"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";

// 1. Definisikan Enum User secara manual biar TS gak bingung
const UserRoleEnum = ["SUPER_ADMIN", "ADMIN", "USER"] as const;

const createUserSchema = z.object({
  name: z.string().min(3, "Nama terlalu pendek (min. 3 karakter)"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  // FIX 1: Hapus options errorMap yang bikin error, pakai enum array biasa
  role: z.enum(UserRoleEnum),
});

type CreateUserFormState = {
  error?: string;
  success?: string;
};

async function checkSuperAdmin() {
  const session = await auth();
  if ((session?.user?.role as string) !== "SUPER_ADMIN") {
    throw new Error("Unauthorized Access: Super Admin Only");
  }
}

export async function getUsers() {
  await checkSuperAdmin();
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
    },
  });
}

export async function createUser(
  formData: FormData,
): Promise<CreateUserFormState> {
  try {
    await checkSuperAdmin();

    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const validatedFields = createUserSchema.safeParse(rawData);

    if (!validatedFields.success) {
      // FIX 2: Ganti .errors jadi .issues
      return { error: validatedFields.error.issues[0].message };
    }

    const { name, email, password, role } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Email ini sudah terdaftar!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role,
      },
    });

    revalidatePath("/admin/users");
    return { success: "User berhasil dibuat!" };
  } catch (err) {
    console.error("Create user error:", err);
    return { error: "Terjadi kesalahan server." };
  }
}

export async function updateUserRole(userId: string, newRole: string) {
  await checkSuperAdmin();
  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole as any },
  });
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  await checkSuperAdmin();
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/users");
}

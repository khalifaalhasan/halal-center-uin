import { z } from "zod";

// Schema untuk Input Form
export const postSchema = z.object({
  title: z.string().min(5, { message: "Judul minimal 5 karakter" }),
  // Slug biasanya digenerate otomatis dari title, tapi bisa juga diinput manual
  slug: z
    .string()
    .min(3, { message: "Slug minimal 3 karakter" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug hanya boleh huruf kecil, angka, dan tanda hubung (-)",
    })
    .optional()
    .or(z.literal("")),
  excerpt: z.string().optional(),
  content: z.string().min(10, { message: "Konten minimal 10 karakter" }),
  image: z.string().url().optional().or(z.literal("")), // Validasi URL gambar
  published: z.boolean().default(false),
  categoryId: z.string().optional().nullable(),
});

export type PostFormValues = z.infer<typeof postSchema>;
import { PrismaClient } from "@prisma/client";
import { CategoryDialog } from "@/components/admin/categories/category-dialog";
import { DeleteCategoryButton } from "@/components/admin/categories/delete-button";
import { SearchInput } from "@/components/ui/search-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Hash } from "lucide-react";

const prisma = new PrismaClient();

export default async function CategoriesPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  // Fetch Kategori + Hitung Jumlah Postingan (_count)
  const categories = await prisma.category.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      _count: {
        select: { posts: true }, // Hitung relasi posts
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Header Page */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kategori</h2>
          <p className="text-muted-foreground text-sm hidden md:block">
            Atur label untuk mengelompokkan berita.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto sm:flex-row">
          <SearchInput placeholder="Cari kategori..." />
          <CategoryDialog />
        </div>
      </div>

      {/* --- DESKTOP VIEW (Table) --- */}
      <div className="hidden md:block border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Kategori</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-center">Jumlah Berita</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium text-base">
                  {category.name}
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">
                  /{category.slug}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="font-normal">
                    {category._count.posts} Artikel
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <CategoryDialog category={category} />
                  <DeleteCategoryButton id={category.id} />
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Kategori "{query}" tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- MOBILE VIEW (Simple Card) --- */}
      <div className="flex flex-col gap-3 md:hidden">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl border shadow-sm p-4 flex items-center justify-between"
          >
            {/* Kiri: Info Kategori */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-emerald-500" />
                <span className="font-semibold text-gray-900">
                  {category.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pl-6">
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full">
                  <FileText className="h-3 w-3" />
                  <span>{category._count.posts} Artikel</span>
                </div>
              </div>
            </div>

            {/* Kanan: Aksi */}
            <div className="flex gap-1">
              <CategoryDialog category={category} />
              <DeleteCategoryButton id={category.id} />
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-center py-8 text-muted-foreground bg-gray-50 rounded-xl border border-dashed">
            <p className="text-sm">Tidak ada kategori.</p>
          </div>
        )}
      </div>
    </div>
  );
}

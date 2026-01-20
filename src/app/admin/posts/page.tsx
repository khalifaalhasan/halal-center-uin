import { PrismaClient } from "@prisma/client";
import Image from "next/image"; // Jangan lupa import ini
import { PostDialog } from "@/components/admin/posts/post-dialog";
// Pastikan path import delete-button benar (sebelumnya ada typo shared/posts)
import { DeleteButton } from "@/components/admin/posts/delete-button";
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
import { User, ImageIcon } from "lucide-react";

const prisma = new PrismaClient();

export default async function PostsPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Berita</h2>
          <p className="text-muted-foreground text-sm hidden md:block">
            Kelola konten website.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto sm:flex-row">
          <SearchInput placeholder="Cari judul..." />
          <PostDialog categories={categories} />
        </div>
      </div>

      {/* --- TAMPILAN 1: TABLE (DESKTOP) --- */}
      <div className="hidden md:block border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {/* Tambah Header Gambar */}
              <TableHead className="w-[80px]">Cover</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                {/* Kolom Gambar Kecil */}
                <TableCell>
                  <div className="relative w-12 h-12 rounded-md overflow-hidden bg-slate-100 border">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized={true} // Aman buat Docker
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-300">
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{post.category?.name}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <PostDialog categories={categories} post={post} />
                  <DeleteButton id={post.id} />
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  Tidak ada data "{query}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- TAMPILAN 2: MOBILE CARD LIST (Compact Media List) --- */}
      <div className="flex flex-col gap-3 md:hidden">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl border shadow-sm p-3 flex flex-col gap-3"
          >
            {/* Row 1: Status & Kategori (Header Kecil) */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${post.published ? "bg-green-500" : "bg-yellow-500"}`}
                />
                <span
                  className={
                    post.published
                      ? "text-green-600 font-medium"
                      : "text-yellow-600 font-medium"
                  }
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-full">
                {post.category?.name || "Umum"}
              </span>
            </div>

            {/* Row 2: Konten Utama (Gambar Kiri - Teks Kanan) */}
            <div className="flex gap-3">
              {/* Gambar Thumbnail */}
              <div className="relative w-20 h-20 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <ImageIcon size={20} />
                  </div>
                )}
              </div>

              {/* Judul & Info */}
              <div className="flex flex-col justify-between flex-1 py-0.5">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{post.author?.name?.split(" ")[0] || "Admin"}</span>
                  </div>

                  {/* Actions (Langsung di samping info author biar hemat tempat) */}
                  <div className="flex gap-1">
                    <PostDialog categories={categories} post={post} />
                    <DeleteButton id={post.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-10 text-muted-foreground bg-gray-50 rounded-xl border border-dashed">
            <p className="text-sm">Tidak ada berita.</p>
          </div>
        )}
      </div>
    </div>
  );
}

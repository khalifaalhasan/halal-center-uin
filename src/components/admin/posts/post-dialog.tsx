"use client";

import { useState, useEffect } from "react";
// ... imports lainnya (Button, Dialog, Input, etc) ...
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPost, updatePost } from "@/actions/posts";
import { toast } from "sonner";
import { Plus, Pencil, ImageIcon, CalendarIcon } from "lucide-react"; // Tambah Icon Calendar

interface PostDialogProps {
  categories: { id: string; name: string }[];
  post?: {
    id: string;
    title: string;
    content: string;
    categoryId: string | null;
    published: boolean;
    image: string | null;
    createdAt: Date; // ✅ Tambahkan ini biar kita bisa ambil tanggal lama
  } | null;
}

export function PostDialog({ categories, post }: PostDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setPreview(post?.image || null);
    } else {
      setPreview(null);
    }
  }, [open, post]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  // --- [HELPER: Format Date ke String Input HTML] ---
  // Input datetime-local butuh format: "YYYY-MM-DDTHH:mm"
  const getDefaultDate = () => {
    if (post?.createdAt) {
      const date = new Date(post.createdAt);
      // Mengoreksi timezone offset agar tampil sesuai jam lokal user
      const offset = date.getTimezoneOffset() * 60000;
      const localISOTime = new Date(date.getTime() - offset)
        .toISOString()
        .slice(0, 16);
      return localISOTime;
    }
    return undefined; // Create mode: kosongin aja (nanti dihandle server jadi NOW)
  };
  // --------------------------------------------------

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      if (post) {
        await updatePost(post.id, formData);
        toast.success("Berita berhasil diperbarui!");
      } else {
        await createPost(formData);
        toast.success("Berita berhasil dibuat!");
      }
      setOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {post ? (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Berita
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Berita" : "Buat Berita Baru"}</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="grid gap-4 py-4">
          {/* ... Upload Gambar ... */}
          <div className="grid gap-2">
            <Label>Cover Gambar</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative overflow-hidden group min-h-[160px]">
              {preview ? (
                <div className="relative w-full h-40">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white text-sm font-medium rounded-md transition-all">
                    Ganti Gambar
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-muted-foreground py-2">
                  <ImageIcon className="h-10 w-10 mb-2 opacity-40" />
                  <span className="text-sm font-medium text-gray-500">
                    Klik untuk upload gambar
                  </span>
                </div>
              )}
              <Input
                type="file"
                name="image"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* ... Judul ... */}
          <div className="grid gap-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              name="title"
              defaultValue={post?.title}
              required
            />
          </div>

          {/* --- [BARU: INPUT TANGGAL] --- */}
          <div className="grid gap-2">
            <Label htmlFor="date">Tanggal & Waktu Publish</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="datetime-local"
                id="date"
                name="date"
                className="pl-9" // Padding kiri biar gak nabrak icon
                defaultValue={getDefaultDate()}
              />
            </div>
            <p className="text-[10px] text-muted-foreground">
              *Kosongkan untuk menggunakan waktu sekarang (saat ini).
            </p>
          </div>
          {/* ----------------------------- */}

          {/* ... Kategori ... */}
          <div className="grid gap-2">
            <Label htmlFor="category">Kategori</Label>
            <Select
              name="categoryId"
              defaultValue={post?.categoryId || ""}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ... Konten ... */}
          <div className="grid gap-2">
            <Label htmlFor="content">Konten</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={post?.content || ""}
              className="h-24 sm:h-32"
              required
            />
          </div>

          {/* ... Published Checkbox ... */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="published"
              id="published"
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              defaultChecked={post?.published ?? true}
            />
            <Label htmlFor="published">Publish Langsung?</Label>
          </div>

          <DialogFooter className="mt-4 gap-2 sm:gap-0 sticky bottom-0 bg-white pt-2 border-t z-20">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Menyimpan..." : "Simpan Data"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
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
import { createCategory, updateCategory } from "@/actions/categories";
import { toast } from "sonner";
import { Plus, Pencil } from "lucide-react";

interface CategoryDialogProps {
  category?: {
    id: string;
    name: string;
  } | null;
}

export function CategoryDialog({ category }: CategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      if (category) {
        await updateCategory(category.id, formData);
        toast.success("Kategori berhasil diperbarui!");
      } else {
        await createCategory(formData);
        toast.success("Kategori berhasil dibuat!");
      }
      setOpen(false);
    } catch (error) {
      toast.error("Gagal menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {category ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] w-[95vw]">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Kategori" : "Kategori Baru"}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Kategori</Label>
            <Input
              id="name"
              name="name"
              placeholder="Contoh: Gaya Hidup"
              defaultValue={category?.name}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

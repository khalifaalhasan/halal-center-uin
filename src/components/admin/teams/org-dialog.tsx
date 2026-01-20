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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTeamMember, updateTeamMember } from "@/actions/organization";
import { toast } from "sonner";
import { Plus, Pencil, User } from "lucide-react";

interface MemberProps {
  id: string;
  name: string;
  role: string;
  image: string | null;
  parentId: string | null;
}

interface OrgDialogProps {
  // Data member flat untuk dropdown pilihan atasan
  allMembers: { id: string; name: string; role: string }[];
  // Data member yang sedang diedit (null jika create new)
  member?: MemberProps | null;
}

export function OrgDialog({ allMembers, member }: OrgDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      if (member) {
        await updateTeamMember(member.id, formData);
        toast.success("Data berhasil diperbarui!");
      } else {
        await createTeamMember(formData);
        toast.success("Anggota berhasil ditambahkan!");
      }
      setOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  // Filter dropdown: Jangan tampilkan diri sendiri di opsi atasan (cegah loop)
  const parentOptions = allMembers.filter((m) => m.id !== member?.id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {member ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-600 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Anggota
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {member ? "Edit Anggota" : "Tambah Anggota Baru"}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="grid gap-4 py-4">
          {/* FOTO */}
          <div className="grid gap-2">
            <Label>Foto Profil</Label>
            <div className="flex items-center gap-4">
              {member?.image && (
                <img
                  src={member.image}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover border"
                />
              )}
              <Input type="file" name="image" accept="image/*" />
            </div>
          </div>

          {/* NAMA */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              name="name"
              defaultValue={member?.name}
              required
              placeholder="Contoh: Dr. Irham Falahi"
            />
          </div>

          {/* JABATAN */}
          <div className="grid gap-2">
            <Label htmlFor="role">Jabatan</Label>
            <Input
              id="role"
              name="role"
              defaultValue={member?.role}
              required
              placeholder="Contoh: Ketua"
            />
          </div>

          {/* ATASAN (PARENT SELECT) */}
          <div className="grid gap-2">
            <Label htmlFor="parentId">Atasan Langsung (Parent)</Label>
            <Select name="parentId" defaultValue={member?.parentId || "root"}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Atasan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="root"
                  className="font-semibold text-indigo-600"
                >
                  -- Pimpinan Tertinggi (Root) --
                </SelectItem>
                {parentOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.name} -{" "}
                    <span className="text-xs text-muted-foreground">
                      {opt.role}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground">
              *Pilih "Pimpinan Tertinggi" jika orang ini adalah Ketua/Kepala.
            </p>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Data"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

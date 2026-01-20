"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTeamMember, restoreTeamMember } from "@/actions/organization"; // Import restore
import { toast } from "sonner"; // Pastikan pakai sonner

export function DeleteOrgButton({ id, name }: { id: string; name: string }) {
  async function handleDelete() {
    try {
      // 1. Jalankan Soft Delete
      await deleteTeamMember(id);

      // 2. Tampilkan Toast dengan tombol Undo
      toast.success(`Anggota "${name}" dihapus.`, {
        description: "Data dipindahkan ke sampah.",
        action: {
          label: "Undo",
          onClick: async () => {
            // Logic saat tombol Undo diklik
            await restoreTeamMember(id);
            toast.success(`Anggota "${name}" dikembalikan.`);
          },
        },
        duration: 5000, // Tombol undo muncul selama 5 detik
      });
    } catch (error) {
      toast.error("Gagal menghapus data.");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Anggota Ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Anggota ini akan dihapus dari struktur. Anda bisa membatalkannya
            (Undo) segera setelah menghapus.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

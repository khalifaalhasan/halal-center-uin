import { LayoutDashboard, FileText, Tags, Users } from "lucide-react";

export const adminRoutes = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/posts",
    label: "Kelola Berita",
    icon: FileText,
  },
  {
    href: "/admin/categories",
    label: "Kelola Kategori",
    icon: Tags,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
    roles: ["SUPER_ADMIN"], // Logic Role Disini
  },
  
];

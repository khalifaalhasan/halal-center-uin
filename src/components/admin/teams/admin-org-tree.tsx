import { OrgMember } from "@/services/organization-service";
import { OrgDialog } from "./org-dialog";
import { DeleteOrgButton } from "./delete-button";
import { CornerDownRight, UserCircle2 } from "lucide-react";

interface AdminOrgTreeProps {
  node: OrgMember;
  level?: number; // Kedalaman indentasi
  allMembersFlat: { id: string; name: string; role: string }[]; // Untuk dropdown edit
  parentId?: string | null; // ID bapaknya node ini
}

export function AdminOrgTree({
  node,
  level = 0,
  allMembersFlat,
  parentId,
}: AdminOrgTreeProps) {
  return (
    <div className="w-full">
      {/* ROW ITEM */}
      <div
        className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm mb-2 hover:border-indigo-200 transition-colors"
        style={{ marginLeft: `${level * 24}px` }} // Indentasi Dinamis CSS
      >
        <div className="flex items-center gap-3">
          {/* Visual Connector L */}
          {level > 0 && <CornerDownRight className="text-slate-300 h-5 w-5" />}

          {/* Avatar */}
          <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
            {node.image ? (
              <img
                src={node.image}
                alt={node.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle2 className="h-5 w-5 text-slate-400" />
            )}
          </div>

          {/* Text */}
          <div>
            <h4 className="font-semibold text-sm text-slate-800">
              {node.name}
            </h4>
            <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
              {node.role}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Pass 'parentId' ke dialog agar saat edit, selectnya terpilih otomatis */}
          <OrgDialog
            allMembers={allMembersFlat}
            member={{
              id: node.id,
              name: node.name,
              role: node.role,
              image: node.image,
              parentId: parentId || "root", // Pass parent ID
            }}
          />

          <DeleteOrgButton id={node.id} name={node.name} />
        </div>
      </div>

      {/* REKURSIF: Render Anak-anaknya */}
      {node.children && node.children.length > 0 && (
        <div className="border-l-2 border-slate-100 ml-[18px] pl-2 border-dashed">
          {node.children.map((child) => (
            <AdminOrgTree
              key={child.id}
              node={child}
              level={level + 1} // Level bertambah
              allMembersFlat={allMembersFlat}
              parentId={node.id} // Node ini adalah parent dari child
            />
          ))}
        </div>
      )}
    </div>
  );
}

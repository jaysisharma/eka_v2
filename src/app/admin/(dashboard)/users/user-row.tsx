"use client";

import { Trash2, Edit3, Check, X, Shield, User as UserIcon, UserCheck, Settings } from "lucide-react";
import { Role } from "@prisma/client";
import { updateUserRole, deleteUser } from "./actions";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function UserRow({ user }: { user: any }) {
  const [role, setRole] = useState(user.role);
  const [tempRole, setTempRole] = useState(user.role);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmRole, setShowConfirmRole] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleRoleSave = async () => {
    setIsUpdating(true);
    const result = await updateUserRole(user.id, tempRole as Role);
    if (result.success) {
      setRole(tempRole);
      setIsEditing(false);
    }
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    await deleteUser(user.id);
  };

  const getRoleBadgeStyle = (r: string) => {
    switch (r) {
      case "ADMIN": return "bg-rose-50 text-rose-600 border-rose-100";
      case "RESEARCHER": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "ACADEMIC_PREMIUM": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  const getRoleIcon = (r: string) => {
    switch (r) {
      case "ADMIN": return <Shield className="w-3 h-3" />;
      case "RESEARCHER": return <Settings className="w-3 h-3" />;
      case "ACADEMIC_PREMIUM": return <UserCheck className="w-3 h-3" />;
      default: return <UserIcon className="w-3 h-3" />;
    }
  };

  return (
    <>
      <tr className="hover:bg-slate-50/80 transition-colors group">
        <td className="px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                alt={user.name || "User"} 
                className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 object-cover shadow-sm"
              />
              <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${
                user.academicStatus === "VERIFIED" ? "bg-emerald-500" : "bg-slate-300"
              }`} />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-bold text-slate-800 leading-none">{user.name || "Unnamed User"}</div>
              <div className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">ID: {user.id.slice(-8).toUpperCase()}</div>
            </div>
          </div>
        </td>
        <td className="px-8 py-5">
          <div className="text-sm text-slate-500 font-medium">
            {user.email}
          </div>
        </td>
        <td className="px-8 py-5">
          <div className="flex justify-center">
            {isEditing ? (
              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-md border border-slate-200">
                <select 
                  value={tempRole}
                  onChange={(e) => setTempRole(e.target.value as Role)}
                  className="bg-transparent text-xs font-bold text-slate-700 px-2 py-1 focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="USER">User</option>
                  <option value="RESEARCHER">Researcher</option>
                  <option value="ACADEMIC_PREMIUM">Academic</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <div className="flex gap-1 border-l border-slate-200 pl-1">
                  <button 
                    onClick={() => setShowConfirmRole(true)} 
                    disabled={isUpdating}
                    className="p-1 text-emerald-500 hover:bg-white rounded transition-all disabled:opacity-50"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => { setIsEditing(false); setTempRole(role); }} 
                    disabled={isUpdating}
                    className="p-1 text-rose-500 hover:bg-white rounded transition-all disabled:opacity-50"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider shadow-sm ${getRoleBadgeStyle(role)}`}>
                {getRoleIcon(role)}
                {role.replace("_", " ")}
              </span>
            )}
          </div>
        </td>
        <td className="px-8 py-5 text-right">
          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-md transition-all"
                title="Edit Role"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={() => setShowConfirmDelete(true)}
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all"
              title="Delete User"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      <ConfirmDialog 
        isOpen={showConfirmRole}
        onClose={() => setShowConfirmRole(false)}
        onConfirm={handleRoleSave}
        title="Update Permissions"
        message={`Authorize permission change for ${user.name || user.email} to ${tempRole}?`}
        confirmText="Update Now"
      />

      <ConfirmDialog 
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Revoke Access"
        message={`Warning: Permanently delete ${user.name || user.email}? This cannot be undone.`}
        confirmText="Revoke Permanently"
        isDestructive={true}
      />
    </>
  );
}

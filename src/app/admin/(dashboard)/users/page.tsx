import prisma from "@/lib/prisma";
import { 
  User as UserIcon, 
  Mail, 
  ShieldCheck,
  Users as UsersIcon,
  UserPlus
} from "lucide-react";
import { UserList } from "./user-list";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  const totalUsers = await prisma.user.count();
  const researchers = await prisma.user.count({ where: { role: "RESEARCHER" } });
  const pending = await prisma.user.count({ where: { academicStatus: "PENDING" } });

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Users</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">Manage platform personnel and permissions</p>
        </div>
        <button className="bg-[#0B1120] text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-lg shadow-slate-200 hover:bg-emerald-600 transition-all flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Personnel" 
          value={totalUsers.toLocaleString()} 
          icon={<UsersIcon className="w-5 h-5 text-emerald-500" />} 
          color="bg-emerald-50"
        />
        <StatCard 
          label="Researchers" 
          value={researchers.toLocaleString()} 
          icon={<ShieldCheck className="w-5 h-5 text-indigo-500" />} 
          color="bg-indigo-50"
        />
        <StatCard 
          label="Pending Review" 
          value={pending.toLocaleString()} 
          icon={<Mail className="w-5 h-5 text-amber-500" />} 
          color="bg-amber-50"
        />
      </div>

      <UserList initialUsers={users} />
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${color} rounded-md transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-800 leading-none">{value}</div>
          <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </div>
  );
}

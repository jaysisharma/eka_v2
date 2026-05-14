import prisma from "@/lib/prisma";
import { 
  UserCheck, 
  Clock, 
  History,
  ShieldAlert,
  ClipboardCheck
} from "lucide-react";
import { VerificationList } from "./verification-list";

export default async function AdminVerification() {
  const users = await prisma.user.findMany({
    where: { 
      role: { not: "ADMIN" }
    },
    orderBy: { updatedAt: "desc" }
  });

  // Filter users who have an academic status set
  const candidates = users.filter(u => u.academicStatus !== null);

  const pendingCount = candidates.filter(u => u.academicStatus === "PENDING").length;
  const approvedCount = candidates.filter(u => u.academicStatus === "APPROVED").length;

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Verification</h2>
        <p className="text-slate-400 text-sm mt-1 font-medium">Review and authorize academic personnel credentials</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          label="Awaiting Review" 
          value={pendingCount.toString()} 
          icon={<Clock className="w-5 h-5 text-amber-500" />} 
          isAlert={pendingCount > 0}
          color="bg-amber-50"
        />
        <StatCard 
          label="Total Verified" 
          value={approvedCount.toString()} 
          icon={<ClipboardCheck className="w-5 h-5 text-emerald-500" />} 
          color="bg-emerald-50"
        />
      </div>

      <VerificationList initialCandidates={candidates} />
    </div>
  );
}

function StatCard({ label, value, icon, isAlert, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      {isAlert && <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/10 rounded-bl-full flex items-center justify-center pl-3 pb-3">
        <ShieldAlert className="w-4 h-4 text-amber-500 animate-pulse" />
      </div>}
      <div className="flex items-center gap-4">
        <div className={`p-4 ${color} rounded-md transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-800 leading-none tracking-tight">{value}</div>
          <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </div>
  );
}

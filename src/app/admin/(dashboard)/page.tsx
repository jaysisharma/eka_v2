import prisma from "@/lib/prisma";
import { 
  Users, 
  FileText, 
  ShieldCheck,
  Globe,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [
    userCount,
    pendingVerifications,
    pendingPapers,
    activeProjects,
    recentUsers,
    recentPapers
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { academicStatus: "PENDING", role: { not: "ADMIN" } } }),
    prisma.researchPaper.count({ where: { status: "PENDING_APPROVAL" } }),
    prisma.project.count({ where: { status: "ONGOING" } }),
    prisma.user.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.researchPaper.findMany({ 
      take: 3, 
      orderBy: { createdAt: "desc" },
      include: { author: true }
    }),
  ]);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">System Overview</h2>
        <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          System Online • Updated just now
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard 
          title="Total Users" 
          value={userCount.toLocaleString()} 
          change="+12.5%" 
          trend="up"
          icon={<Users className="w-5 h-5 text-emerald-500" />} 
          color="bg-emerald-50"
        />
        <StatusCard 
          title="New Requests" 
          value={pendingVerifications.toString()} 
          change={`${pendingVerifications > 5 ? "Action Required" : "Stable"}`}
          trend={pendingVerifications > 5 ? "down" : "up"}
          icon={<ShieldCheck className="w-5 h-5 text-blue-500" />} 
          color="bg-blue-50"
        />
        <StatusCard 
          title="Live Projects" 
          value={activeProjects.toString()} 
          change="+3 this week"
          trend="up"
          icon={<Globe className="w-5 h-5 text-indigo-500" />} 
          color="bg-indigo-50"
        />
        <StatusCard 
          title="New Papers" 
          value={pendingPapers.toString()} 
          change="Awaiting Review"
          trend="up"
          icon={<FileText className="w-5 h-5 text-amber-500" />} 
          color="bg-amber-50"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[20px] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Recent Activity</h3>
            </div>
            <Link href="/admin/users" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              View All Logs
            </Link>
          </div>
          
          <div className="space-y-1">
            {recentPapers.map((paper, idx) => (
              <ActivityItem 
                key={paper.id}
                user={paper.author.name || "Unknown Author"} 
                avatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${paper.author.email}`}
                action="uploaded a paper" 
                target={paper.title} 
                time={new Date(paper.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                isLast={idx === recentPapers.length + recentUsers.length - 1}
              />
            ))}
            {recentUsers.map((user, idx) => (
              <ActivityItem 
                key={user.id}
                user={user.name || user.email || "New User"} 
                avatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                action="joined the" 
                target={user.role === "ADMIN" ? "Admin Team" : "Platform"} 
                time={new Date(user.createdAt).toLocaleDateString()} 
                isLast={idx === recentUsers.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Priority Actions */}
        <div className="space-y-6">
          <div className="bg-[#0B1120] text-white rounded-[20px] p-8 shadow-xl shadow-slate-200">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Quick Actions
            </h3>
            
            <div className="space-y-4">
              <Link href="/admin/verification" className="block group">
                <div className="p-5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Verify Users</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-xl font-bold">{pendingVerifications} Waiting</div>
                  <div className="text-xs text-slate-400 mt-1">Check new user requests</div>
                </div>
              </Link>

              <Link href="/admin/papers" className="block group">
                <div className="p-5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Paper Reviews</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-xl font-bold">{pendingPapers} New</div>
                  <div className="text-xs text-slate-400 mt-1">Approve pending research</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-emerald-500 rounded-[20px] p-8 text-white relative overflow-hidden group cursor-pointer">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h3 className="font-bold text-lg mb-2 relative z-10">Get Help</h3>
            <p className="text-emerald-50 text-sm relative z-10 mb-6">Need assistance? Contact our support team for quick help.</p>
            <button className="bg-white text-emerald-600 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 relative z-10 hover:scale-105 transition-transform">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusCard({ title, value, change, trend, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 ${color} rounded-xl group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
          trend === "up" ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
        }`}>
          {trend === "up" ? "↑" : "↓"} {change}
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-800 tracking-tight">{value}</div>
      <div className="text-sm text-slate-400 font-medium mt-1">{title}</div>
    </div>
  );
}

function ActivityItem({ user, avatar, action, target, time, isLast }: any) {
  return (
    <div className={`flex items-start gap-4 py-4 ${!isLast ? "border-b border-slate-50" : ""} group`}>
      <img src={avatar} alt={user} className="w-10 h-10 rounded-full bg-slate-100 object-cover border-2 border-white shadow-sm" />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-slate-400 leading-snug">
          <span className="font-bold text-slate-800">{user}</span>{" "}
          <span className="opacity-80">{action}</span>{" "}
          <span className="text-emerald-600 font-semibold truncate">{target}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Clock className="w-3 h-3 text-slate-300" />
          <span className="text-[11px] text-slate-400 font-medium">{time}</span>
        </div>
      </div>
      <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-emerald-500">
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
}

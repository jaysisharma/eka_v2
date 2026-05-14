import { 
  Briefcase, 
  Ticket, 
  ShoppingBag, 
  Bookmark, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function PortalDashboard() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase">Personnel Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, Research Candidate.</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          Status: Verified
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PortalStatCard label="Applications" value="3" icon={<Briefcase className="w-5 h-5 text-primary" />} />
        <PortalStatCard label="Event Tickets" value="1" icon={<Ticket className="w-5 h-5 text-blue-500" />} />
        <PortalStatCard label="Orders" value="2" icon={<ShoppingBag className="w-5 h-5 text-emerald-500" />} />
        <PortalStatCard label="Saved Papers" value="14" icon={<Bookmark className="w-5 h-5 text-purple-500" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Active Applications</h3>
            <Link href="/portal/applications" className="text-[10px] font-black text-primary hover:underline uppercase">View All</Link>
          </div>
          <div className="space-y-4">
            <ActivityItem 
              title="Senior Propulsion Engineer" 
              status="In Review" 
              date="2 days ago" 
              icon={<Clock className="w-4 h-4 text-amber-400" />}
            />
            <ActivityItem 
              title="Astrobiology Intern" 
              status="Accepted" 
              date="5 days ago" 
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Mission Events</h3>
            <Link href="/portal/events" className="text-[10px] font-black text-primary hover:underline uppercase">Tickets</Link>
          </div>
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex justify-between items-center">
            <div>
              <div className="text-xs font-black text-white uppercase mb-1">Propulsion Symposium 2026</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">June 12 • Oslo HQ</div>
            </div>
            <Link href="/portal/events/1" className="p-2 bg-primary/20 rounded-lg text-primary hover:bg-primary transition-all">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortalStatCard({ label, value, icon }: any) {
  return (
    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 group hover:border-primary/20 transition-all">
      <div className="p-3 bg-white/5 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-3xl font-black text-white leading-none mb-1">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">{label}</div>
    </div>
  );
}

function ActivityItem({ title, status, date, icon }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-white/5 rounded-xl">{icon}</div>
        <div>
          <div className="text-xs font-bold text-white leading-tight">{title}</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">{date}</div>
        </div>
      </div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{status}</div>
    </div>
  );
}

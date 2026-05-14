import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  FlaskConical,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ResearcherDashboard() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">Researcher Portal</h1>
          <p className="text-slate-500 mt-1">Manage your publications, datasets, and collaborative missions.</p>
        </div>
        <Link 
          href="/researcher/papers/new"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 glow-border"
        >
          Submit New Paper <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Published Papers" 
          value="12" 
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />} 
        />
        <StatCard 
          title="Pending Review" 
          value="3" 
          icon={<Clock className="w-5 h-5 text-amber-400" />} 
        />
        <StatCard 
          title="Total Citations" 
          value="452" 
          icon={<BookOpen className="w-5 h-5 text-blue-400" />} 
        />
        <StatCard 
          title="Peer Reviews" 
          value="8" 
          icon={<MessageSquare className="w-5 h-5 text-primary" />} 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Research */}
        <div className="lg:col-span-2 glass-panel rounded-[2rem] p-8 border border-white/5">
          <h3 className="font-bold text-lg mb-8 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" />
            Recent Publications
          </h3>
          
          <div className="space-y-4">
            <PaperItem 
              title="Hyper-Spectral Imaging of Martian Regolith" 
              status="PUBLISHED" 
              date="May 02, 2026" 
              visibility="PREMIUM"
            />
            <PaperItem 
              title="Propulsion Efficiency in Vacuum Environments" 
              status="UNDER REVIEW" 
              date="Apr 28, 2026" 
              visibility="PUBLIC"
            />
            <PaperItem 
              title="Quantum Communication in Deep Space" 
              status="DRAFT" 
              date="Apr 20, 2026" 
              visibility="PRIVATE"
            />
          </div>
        </div>

        {/* Lab Announcements */}
        <div className="glass-panel rounded-[2rem] p-8 border border-white/5 bg-primary/5">
          <h3 className="font-bold text-lg mb-6">Lab Notifications</h3>
          <div className="space-y-6">
            <NotificationItem 
              title="Dataset Updated" 
              desc="JWST Sector 4 data is now available for analysis." 
              time="1h ago" 
            />
            <NotificationItem 
              title="Review Requested" 
              desc="You have been invited to review 'Solar Sail Dynamics'." 
              time="4h ago" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/5">
      <div className="p-2 bg-white/5 w-fit rounded-xl mb-4">{icon}</div>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{title}</div>
    </div>
  );
}

function PaperItem({ title, status, date, visibility }: any) {
  const statusColors: any = {
    PUBLISHED: "text-emerald-400 bg-emerald-400/10",
    "UNDER REVIEW": "text-amber-400 bg-amber-400/10",
    DRAFT: "text-slate-400 bg-slate-400/10"
  };

  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
      <div className="space-y-1">
        <h4 className="font-bold text-white group-hover:text-primary transition-colors">{title}</h4>
        <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-slate-500">
          <span>{date}</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full" />
          <span className="text-primary/70">{visibility}</span>
        </div>
      </div>
      <div className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full ${statusColors[status]}`}>
        {status}
      </div>
    </div>
  );
}

function NotificationItem({ title, desc, time }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-sm text-white">{title}</h4>
        <span className="text-[9px] text-slate-500 font-bold uppercase">{time}</span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

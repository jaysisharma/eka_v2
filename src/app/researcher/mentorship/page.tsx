import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Plus, 
  UserPlus,
  MessageSquare,
  ArrowRight
} from "lucide-react";

const ACTIVE_PROGRAMS = [
  { id: "1", title: "Advanced Propulsion Internals", mentees: 4, applications: 12, status: "ACTIVE" }
];

const PENDING_APPLICANTS = [
  { id: "1", name: "Jaysi Sharma", role: "Graduate Student", program: "Advanced Propulsion Internals", date: "2h ago" },
  { id: "2", name: "Elena Rossi", role: "PhD Candidate", program: "Advanced Propulsion Internals", date: "5h ago" }
];

export default function ResearcherMentorship() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">Mentorship Control</h1>
          <p className="text-slate-500 mt-1">Manage your academic programs and mentee applications.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all glow-border">
          <Plus className="w-4 h-4" />
          New Program
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Active Mentees" value="4" icon={<Users className="w-5 h-5 text-primary" />} />
        <StatCard label="Live Programs" value="1" icon={<BookOpen className="w-5 h-5 text-blue-500" />} />
        <StatCard label="Pending Apps" value="12" icon={<UserPlus className="w-5 h-5 text-amber-500" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Active Programs */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 space-y-6">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Active Programs</h3>
          {ACTIVE_PROGRAMS.map((prog) => (
            <div key={prog.id} className="p-6 rounded-2xl border border-white/5 bg-white/2 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white mb-1 uppercase tracking-tight">{prog.title}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  {prog.mentees} Mentees • {prog.applications} Pending Apps
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-500/20">
                {prog.status}
              </span>
            </div>
          ))}
        </div>

        {/* Pending Applicants */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 space-y-6">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Applicant Review</h3>
          <div className="space-y-4">
            {PENDING_APPLICANTS.map((app) => (
              <div key={app.id} className="p-6 rounded-2xl border border-white/5 bg-white/2 flex flex-col sm:row items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary">
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{app.name}</div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{app.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-emerald-500/20 text-slate-600 hover:text-emerald-400 rounded-lg transition-all" title="Accept">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-red-500/20 text-slate-600 hover:text-red-400 rounded-lg transition-all" title="Reject">
                    <XCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-white/5 text-slate-600 hover:text-white rounded-lg transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: any) {
  return (
    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5">
      <div className="p-3 bg-white/5 rounded-2xl w-fit mb-4">{icon}</div>
      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">{label}</div>
    </div>
  );
}

import { Briefcase, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const APPLICATIONS = [
  { id: "1", role: "Senior Propulsion Engineer", status: "UNDER REVIEW", type: "VACANCY", date: "May 06, 2026" },
  { id: "2", role: "Astrobiology Research Intern", status: "ACCEPTED", type: "INTERNSHIP", date: "May 03, 2026" },
];

export default function MyApplications() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Mission Applications</h1>
        <p className="text-slate-500 mt-1">Track your recruitment status and portfolio reviews.</p>
      </header>

      <div className="space-y-4">
        {APPLICATIONS.map((app) => (
          <div key={app.id} className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 flex flex-col md:row items-center justify-between gap-6 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-primary">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{app.role}</h3>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                  {app.type} • Submitted {app.date}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-tighter ${
                app.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-400/10 text-amber-400 border-amber-400/20'
              }`}>
                {app.status === 'ACCEPTED' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {app.status}
              </div>
              <button className="p-3 bg-white/5 rounded-xl text-slate-700 hover:text-primary hover:bg-primary/10 transition-all border border-white/5">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import {
  User,
  MapPin,
  Globe,
  FileText,
  Rocket,
  Users,
  Award,
  ArrowRight,
  Mail,
  Briefcase,
  Send

} from "lucide-react";
import Link from "next/link";

export default function ResearcherPortfolio({ params }: { params: { id: string } }) {
  // Mock Data
  const researcher = {
    name: "Dr. Alistair Thorne",
    role: "Senior Propulsion Lead",
    institution: "Eka Research Labs",
    location: "Oslo, Norway",
    bio: "Focused on high-efficiency ion drives and quantum communication relays. Lead investigator for the 2030 Deep Space Telemetry project.",
    stats: {
      publications: 24,
      projects: 3,
      citations: "1.2k+",
      collaborators: 12
    },
    specialties: ["Ion Propulsion", "Quantum Entanglement", "Deep Space Logistics"],
    papers: [
      { id: "1", title: "Quantum Entanglement in Deep Space Communications", date: "May 2026", category: "Propulsion" },
      { id: "2", title: "Hall-Effect Thruster Efficiency Optimization", date: "Feb 2026", category: "Propulsion" },
      { id: "3", title: "Neural Networks for Autonomous Docking", date: "Dec 2025", category: "Robotics" }
    ]
  };

  return (
    <main className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar: Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 text-center bg-white/5">
              <div className="w-40 h-40 bg-primary/10 rounded-[2.5rem] mx-auto mb-6 flex items-center justify-center border border-primary/20 overflow-hidden shadow-2xl">
                <User className="w-20 h-20 text-primary/40" />
              </div>
              <h1 className="text-2xl font-black text-white leading-tight mb-2 uppercase">{researcher.name}</h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">{researcher.role}</p>

              <div className="flex justify-center gap-4 mb-8">
                <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-white/5">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-white/5">
                  <Briefcase className="w-4 h-4" />
                </button>
                <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-white/5">
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all glow-border">
                Follow Researcher
              </button>
            </div>

            <div className="p-6 rounded-3xl border border-white/5 bg-white/5 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact Details</h4>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-primary/60" />
                {researcher.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Globe className="w-4 h-4 text-primary/60" />
                {researcher.institution}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Bio & Stats */}
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3 mb-6">
                    <span className="w-8 h-px bg-primary/30" />
                    Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {researcher.specialties.map((s) => (
                      <span key={s} className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StatBox label="Publications" value={researcher.stats.publications} icon={<FileText className="w-4 h-4" />} />
                  <StatBox label="Citations" value={researcher.stats.citations} icon={<Award className="w-4 h-4" />} />
                </div>
              </div>

              <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5">
                <p className="text-slate-400 text-lg leading-relaxed italic">
                  "{researcher.bio}"
                </p>
              </div>
            </div>

            {/* Publication List */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-px bg-primary/30" />
                Published Research
              </h2>

              <div className="space-y-4">
                {researcher.papers.map((paper) => (
                  <Link
                    key={paper.id}
                    href={`/research/${paper.id}`}
                    className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all bg-white/5"
                  >
                    <div className="flex items-center gap-6">
                      <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                        <FileText className="w-6 h-6 text-slate-500 group-hover:text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{paper.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">
                          <span>{paper.date}</span>
                          <span className="w-1 h-1 bg-slate-800 rounded-full" />
                          <span>{paper.category}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-700 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Engagement */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-primary" />
                  Active Missions
                </h3>
                <div className="space-y-4">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Orbital-01 Quantum Relay</div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%]" />
                  </div>
                </div>
              </div>
              <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Collaboration Network
                </h3>
                <div className="flex -space-x-3 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-[#020617] bg-white/10 border border-white/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-600" />
                    </div>
                  ))}
                  <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-[#020617] bg-primary/20 text-primary text-[10px] font-black">
                    +7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatBox({ label, value, icon }: any) {
  return (
    <div className="glass-panel p-6 rounded-[2rem] border border-white/5 bg-white/5 text-center min-w-[140px]">
      <div className="text-primary/60 mb-2 flex justify-center">{icon}</div>
      <div className="text-2xl font-black text-white leading-none">{value}</div>
      <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600 mt-2">{label}</div>
    </div>
  );
}

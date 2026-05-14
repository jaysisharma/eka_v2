import { PaperCard } from "@/components/papers/paper-card";
import { Search, Filter, Rocket, FlaskConical, Globe } from "lucide-react";

const MOCK_PAPERS = [
  {
    id: "1",
    title: "Quantum Entanglement in Deep Space Communications",
    author: "Dr. Alistair Thorne",
    abstract: "This paper explores the feasibility of using quantum entangled photons for near-instantaneous communication across interplanetary distances, overcoming the limitations of light-speed lag in orbital telemetry...",
    category: "QUANTUM PHYSICS",
    tags: ["Quantum", "Deep Space", "Comm"],
    date: "May 05, 2026",
    isPremium: true
  },
  {
    id: "2",
    title: "Propulsion Efficiency of Ion Thrusters in Martian Atmosphere",
    author: "Sarah J. Miller",
    abstract: "A comprehensive analysis of ion propulsion performance within the thin CO2 atmosphere of Mars. We present experimental data from the Eka Atmospheric Simulator revealing a 12% increase in efficiency using localized magnetic shielding...",
    category: "PROPULSION",
    tags: ["Mars", "Ion", "Efficiency"],
    date: "May 01, 2026",
    isPremium: false
  },
  {
    id: "3",
    title: "Lunar Base Structural Integrity Under Seismic Stress",
    author: "Ingrid Volkov",
    abstract: "Lunar seismic activity, or 'moonquakes', poses a significant threat to long-term modular habitats. This study evaluates regolith-composite shielding and its dampening effects on 4.5 magnitude events recorded by the Apollo 12...",
    category: "ARCHITECTURE",
    tags: ["Lunar", "Seismic", "Safety"],
    date: "Apr 28, 2026",
    isPremium: true
  },
  {
    id: "4",
    title: "Automated Hydroponics in Microgravity Environments",
    author: "David Suzuki",
    abstract: "Sustainable life support systems require high-efficiency nutrient delivery. We demonstrate a new AI-driven capillary system that optimizes water distribution in zero-G, reducing consumption by 40% compared to ISS standards...",
    category: "BIOLOGY",
    tags: ["ISS", "Hydroponics", "AI"],
    date: "Apr 25, 2026",
    isPremium: false
  }
];

export default function ResearchArchive() {
  const isUserPremium = false; // Mocking guest/regular user state

  return (
    <main className="min-h-screen bg-[#020617] pt-24 pb-20 px-6">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-16 text-center lg:text-left flex flex-col lg:row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              <FlaskConical className="w-3 h-3" />
              Global Research Archive
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6">
              Pioneering <span className="text-primary glow-text">Knowledge.</span>
            </h1>
            <p className="text-slate-400 leading-relaxed text-lg">
              Explore thousands of peer-reviewed research papers, technical datasets, and mission reports from the world's leading aerospace organization.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search archive..."
                className="w-full sm:w-80 bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-600"
              />
            </div>
            <button className="glass-panel px-6 py-4 rounded-2xl border border-white/5 flex items-center justify-center gap-2 text-sm font-bold hover:bg-white/5 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </header>

        {/* Quick Categories */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center lg:justify-start">
          <CategoryBtn icon={<Rocket />} label="Propulsion" />
          <CategoryBtn icon={<Globe />} label="Planetary Science" />
          <CategoryBtn icon={<FlaskConical />} label="Deep Space Physics" />
        </div>

        {/* Paper Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {MOCK_PAPERS.map((paper) => (
            <PaperCard key={paper.id} paper={paper} isUserPremium={isUserPremium} />
          ))}
        </div>
      </div>
    </main>
  );
}

function CategoryBtn({ icon, label }: any) {
  return (
    <button className="glass-panel px-5 py-3 rounded-xl border border-white/5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:border-primary/30 hover:text-white transition-all text-slate-500">
      <span className="text-primary w-4 h-4">{icon}</span>
      {label}
    </button>
  );
}

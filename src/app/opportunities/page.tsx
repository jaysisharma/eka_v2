import { OpportunityCard } from "@/components/opportunities/opportunity-card";
import { 
  Briefcase, 
  Search, 
  Filter, 
  Rocket, 
  Globe, 
  ShieldCheck,
  UserPlus
} from "lucide-react";

const MOCK_OPPORTUNITIES = [
  {
    id: "1",
    title: "Senior Propulsion Engineer",
    type: "VACANCY",
    location: "Oslo, Norway",
    deadline: "JUN 15, 2026",
    salary: "$120k - $160k",
    description: "Lead the development of high-efficiency ion drives for long-duration deep space missions. Required expertise in hall-effect thrusters and neural control systems."
  },
  {
    id: "2",
    title: "Astrobiology Research Intern",
    type: "INTERNSHIP",
    location: "Stockholm, Sweden",
    deadline: "JUN 01, 2026",
    salary: "Stipend Provided",
    description: "Assist senior researchers in analyzing Martian regolith samples and developing biosignature detection protocols for the 2030 mission suite."
  },
  {
    id: "3",
    title: "Mission Logistics Specialist",
    type: "VACANCY",
    location: "Remote / Orbital-01",
    deadline: "MAY 28, 2026",
    salary: "$90k - $110k",
    description: "Coordinate supply chain logistics between terrestrial hubs and orbital stations. Experience with automated cargo docking protocols is preferred."
  }
];

export default function OpportunitiesArchive() {
  return (
    <main className="min-h-screen bg-[#020617] pt-24 pb-20 px-6">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-16 text-center lg:text-left flex flex-col lg:row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              <UserPlus className="w-3 h-3" />
              Career & Internships
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6 uppercase">
              Join the <span className="text-primary glow-text">Mission.</span>
            </h1>
            <p className="text-slate-400 leading-relaxed text-lg">
              Explore professional vacancies and academic internships within the world's most innovative aerospace organization.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Find opportunities..."
                className="w-full sm:w-80 bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-600"
              />
            </div>
            <button className="glass-panel px-6 py-4 rounded-2xl border border-white/5 flex items-center justify-center gap-2 text-sm font-bold hover:bg-white/5 transition-all">
              <Filter className="w-4 h-4" />
              Type
            </button>
          </div>
        </header>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard 
            icon={<Rocket className="w-6 h-6" />} 
            title="Global Impact" 
            desc="Work on missions that redefine human knowledge and space exploration boundaries."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6" />} 
            title="Research Freedom" 
            desc="Access state-of-the-art laboratories and proprietary organizational datasets."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6" />} 
            title="Diverse Culture" 
            desc="Collaborate with scientists and engineers from over 40 terrestrial nations."
          />
        </div>

        {/* Opportunities List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-primary/30" />
            Active Openings
          </h2>
          {MOCK_OPPORTUNITIES.map((opportunity: any) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="glass-panel p-8 rounded-[2rem] border border-white/5 bg-white/5 group hover:border-primary/20 transition-all">
      <div className="p-3 bg-primary/10 w-fit rounded-2xl mb-6 text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

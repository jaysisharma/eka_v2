import { Rocket, ShieldCheck, Globe, Users, Target, Zap, Building2, Globe2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <Building2 className="w-3 h-3" />
            Institutional Overview
          </div>
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white mb-8 uppercase leading-none">
            Advancing <span className="text-primary glow-text">Mankind.</span>
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-xl leading-relaxed">
            Eka Aerospace is a multi-national research organization dedicated to establishing a permanent human presence in deep space through breakthroughs in propulsion, logistics, and orbital infrastructure.
          </p>
        </header>

        {/* Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <VisionCard 
            icon={<Rocket className="w-8 h-8" />}
            title="Deep Space Exploration"
            desc="Developing the next generation of ion drives and autonomous docking systems to reach the outer planets."
          />
          <VisionCard 
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Institutional Security"
            desc="Establishing secure, verified academic protocols for global research collaboration and data integrity."
          />
          <VisionCard 
            icon={<Globe className="w-8 h-8" />}
            title="Terrestrial Footprint"
            desc="Operating research hubs in Oslo, Stockholm, and remote orbital relays to maintain constant telemetry."
          />
          <VisionCard 
            icon={<Users className="w-8 h-8" />}
            title="Global Fellowship"
            desc="Fostering a community of over 10,000 scientists, engineers, and academic researchers worldwide."
          />
        </div>

        {/* Organization Structure */}
        <section className="mb-32">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-16 flex items-center gap-4">
            <span className="w-12 h-1 bg-primary" />
            Our Divisions
          </h2>
          <div className="grid lg:grid-cols-3 gap-12">
            <DivisionItem 
              name="Propulsion & Orbital Mechanics" 
              location="Oslo, Norway" 
              focus="Hall-effect thrusters, orbital synchronization, and neural docking."
            />
            <DivisionItem 
              name="Astrobiology & Habitability" 
              location="Stockholm, Sweden" 
              focus="Biosignature detection, exoplanet atmospheric analysis, and life support."
            />
            <DivisionItem 
              name="Mission Logistics & Infrastructure" 
              location="Orbital-01 Station" 
              focus="Automated supply chains, quantum relays, and lunar base modularity."
            />
          </div>
        </section>

        {/* Global Stats */}
        <div className="glass-panel p-16 rounded-[3rem] border border-white/5 bg-white/5 text-center">
          <div className="grid md:grid-cols-4 gap-12">
            <StatItem label="Nations Represented" value="42" />
            <StatItem label="Active Missions" value="12" />
            <StatItem label="Verified Researchers" value="1.2k+" />
            <StatItem label="Annual Publications" value="450+" />
          </div>
        </div>
      </div>
    </main>
  );
}

function VisionCard({ icon, title, desc }: any) {
  return (
    <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-white/2 hover:bg-white/5 transition-all">
      <div className="p-4 bg-primary/10 w-fit rounded-2xl mb-8 text-primary">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 uppercase">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function DivisionItem({ name, location, focus }: any) {
  return (
    <div className="space-y-4">
      <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{location}</div>
      <h4 className="text-xl font-bold text-white leading-tight uppercase">{name}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{focus}</p>
    </div>
  );
}

function StatItem({ label, value }: any) {
  return (
    <div className="space-y-2">
      <div className="text-5xl font-black text-white tracking-tighter">{value}</div>
      <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{label}</div>
    </div>
  );
}

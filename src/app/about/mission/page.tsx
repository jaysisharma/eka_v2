import { 
  Globe, 
  Shield, 
  Database,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function MissionPage() {
  const pillars = [
    {
      title: "Space Sustainability",
      desc: "We focus on preserving the orbital environment through debris mitigation and sustainable satellite lifecycle management.",
      icon: Globe
    },
    {
      title: "Scholarly Registry",
      desc: "Eka operates as a neutral institutional registry, providing verified data and peer-reviewed research to the global community.",
      icon: Shield
    },
    {
      title: "Open Data Access",
      desc: "We ensure that critical orbital telemetry and propulsion breakthroughs are accessible to all academic institutions.",
      icon: Database
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white font-jakarta selection:bg-primary selection:text-black">
      {/* Simple Header */}
      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Institutional Mission</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Advancing human discovery through sustainable space research.
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Eka Aerospace is a non-profit research organization dedicated to the sustainable exploration of orbit through institutional precision and open-source breakthroughs.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Pillars - Simple Clean Grid */}
      <section className="py-24 bg-white/[0.01]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="space-y-6">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-sm">
                  <pillar.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">{pillar.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section - Simple & Focused */}
      <section className="py-32">
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">A Scholarly Infrastructure</h2>
            <p className="text-slate-400 leading-relaxed">
              By partnering with over 150 academic institutions, we have built a decentralized research network that ensures space exploration remains a collaborative human endeavor. Our hubs in Stockholm and Oslo serve as the primary coordination points for global orbital telemetry.
            </p>
            <div className="pt-6 border-t border-white/5 flex items-center gap-10">
              <div>
                <p className="text-2xl font-bold text-white">150+</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Partners</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">8.4PB</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Data Harvested</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-video md:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1500" 
              alt="Data Network" 
              className="w-full h-full object-cover opacity-40 grayscale"
            />
          </div>
        </div>
      </section>


      {/* Simple Footer Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Eka Aerospace Research Organization</p>
        </div>
      </footer>
    </main>
  );
}

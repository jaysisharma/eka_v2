import {
  Users,
  Mail,
  ArrowUpRight
} from "lucide-react";

export default function TeamPage() {
  const team = [
    {
      name: "Dr. Aris Thorne",
      role: "Lead Scientist / Founder",
      bio: "Expert in orbital mechanics and sustainable propulsion systems. Formerly lead at the Stockholm Aerospace Institute.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
      email: "aris@eka.org"
    },
    {
      name: "Prof. Elara Vance",
      role: "Chief of Astrobiology",
      bio: "Specializing in extreme environment habitability. Directs the Jovian signature detection program.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000",
      email: "elara@eka.org"
    },
    {
      name: "Marcus Thorne",
      role: "Chief Orbital Architect",
      bio: "Pioneer in satellite swarm coordination and autonomous constellation management.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
      email: "marcus@eka.org"
    },
    {
      name: "Dr. Sara Rossi",
      role: "Senior Physicist",
      bio: "Lead for magnetospheric shielding research and high-energy plasma interactions.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000",
      email: "sara@eka.org"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white font-jakarta selection:bg-primary selection:text-black">
      {/* Simple Header */}
      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">The Institution</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Our Team
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              The researchers, engineers, and visionaries leading Eka's sustainable space initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid - Simple & Readable */}
      <section className="py-24">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {team.map((member) => (
              <div key={member.name} className="group space-y-6">
                <div className="aspect-[4/5] bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{member.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">{member.role}</p>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    {member.bio}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-24 border-t border-white/5">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Eka Aerospace Research Organization • Human Frontier</p>
        </div>
      </footer>
    </main>
  );
}

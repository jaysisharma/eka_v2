import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  MessageSquare,
  Trophy,
  ArrowRight,
  UserCheck
} from "lucide-react";
import Link from "next/link";

const MOCK_MENTORS = [
  {
    id: "1",
    name: "Dr. Elena Vance",
    role: "Senior Propulsion Engineer",
    expertise: ["Ion Drives", "Orbital Mechanics"],
    organization: "ESA Research Center",
    experience: "15+ Years",
    availability: "Limited"
  },
  {
    id: "2",
    name: "Col. Marcus Reed",
    role: "Mission Logistics Specialist",
    expertise: ["Space Law", "Orbital Logistics"],
    organization: "Eka Operations",
    experience: "20+ Years",
    availability: "Open"
  },
  {
    id: "3",
    name: "Dr. Aris Thorne",
    role: "Astrobiology Lead",
    expertise: ["Mars Regolith", "Life Detection"],
    organization: "NASA Ames (Affiliate)",
    experience: "12+ Years",
    availability: "Mentoring 2"
  }
];

export default function MentorshipPortal() {
  return (
    <main className="min-h-screen bg-[#020617] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <Users className="w-3 h-3" />
            Academic Mentorship
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6 uppercase">
            Guide the <span className="text-primary glow-text">Next Generation.</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-lg">
            Connect with industry-leading aerospace engineers and space scientists for personalized academic guidance and career growth within the Eka ecosystem.
          </p>
        </header>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <BenefitCard 
            icon={<MessageSquare className="w-6 h-6" />} 
            title="Direct Access" 
            desc="One-on-one sessions with senior researchers from global space agencies."
          />
          <BenefitCard 
            icon={<Trophy className="w-6 h-6" />} 
            title="Career Pathing" 
            desc="Strategic advice on navigating the aerospace industry and academic grants."
          />
          <BenefitCard 
            icon={<ShieldCheck className="w-6 h-6" />} 
            title="Verified Mentors" 
            desc="Every mentor is manually verified by the Eka Administrative Board."
          />
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b border-white/5 pb-8">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
            <span className="w-8 h-px bg-primary/30" />
            Find Your Mentor
          </h2>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative group flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by expertise..."
                className="w-full md:w-64 bg-slate-900/50 border border-white/5 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary/50 transition-all text-sm text-white placeholder:text-slate-600"
              />
            </div>
            <button className="glass-panel px-4 py-3 rounded-xl border border-white/5 flex items-center justify-center gap-2 text-xs font-bold hover:bg-white/5 transition-all">
              <Filter className="w-4 h-4" />
              Expertise
            </button>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {MOCK_MENTORS.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 glass-panel p-12 rounded-[3rem] border border-white/5 bg-primary/5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <UserCheck className="w-48 h-48" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Become an Eka Mentor</h3>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Are you a senior researcher or aerospace professional? Help shape the future of space exploration by mentoring the next generation of scientists.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform glow-border uppercase text-xs tracking-widest">
            Apply to Mentor
          </button>
        </div>
      </div>
    </main>
  );
}

function BenefitCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-3xl border border-white/5 bg-white/5 hover:border-primary/20 transition-all text-center">
      <div className="p-3 bg-primary/10 w-fit rounded-2xl mb-6 text-primary mx-auto">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function MentorCard({ mentor }: any) {
  return (
    <div className="glass-panel rounded-[2rem] border border-white/5 p-8 hover:border-primary/30 transition-all group">
      <div className="flex items-start justify-between mb-8">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary text-2xl font-black">
          {mentor.name.charAt(0)}
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
          {mentor.availability}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{mentor.name}</h3>
      <p className="text-xs text-slate-500 font-medium mb-6 uppercase tracking-wider">{mentor.role}</p>
      
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.map(exp => (
            <span key={exp} className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-1 rounded-lg">#{exp}</span>
          ))}
        </div>
        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-2">
          <Globe className="w-3 h-3 text-primary/50" />
          {mentor.organization}
        </div>
      </div>

      <button className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
        Request Mentorship <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

import { EventCard } from "@/components/events/event-card";
import { 
  Calendar, 
  Search, 
  Filter, 
  Rocket, 
  Globe, 
  FlaskConical,
  Trophy
} from "lucide-react";

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Mars Orbital Dynamics Workshop",
    description: "An intensive technical workshop focusing on trajectory optimization and orbital insertion maneuvers for deep space missions. Led by Eka propulsion specialists.",
    date: "JUN 12, 2026",
    time: "09:00 - 17:00 UTC",
    location: "Eka Command Center, Oslo",
    type: "WORKSHOP",
    seatsTotal: 50,
    seatsRemaining: 12,
    isVirtual: false
  },
  {
    id: "2",
    title: "International Symposium on Lunar Habitats",
    description: "Join global leaders in aerospace architecture to discuss the next generation of modular lunar habitats and regolith shielding technologies.",
    date: "JUN 20, 2026",
    time: "14:00 - 18:00 UTC",
    location: "Digital Theatre - Orbital 01",
    type: "SYMPOSIUM",
    seatsTotal: 1000,
    seatsRemaining: 450,
    isVirtual: true
  },
  {
    id: "3",
    title: "Propulsion Engineering Conference 2026",
    description: "The annual Eka conference for propulsion innovations. Showcasing breakthroughs in nuclear thermal propulsion and ion drive efficiency.",
    date: "JUL 05, 2026",
    time: "08:00 - 20:00 UTC",
    location: "Science Plaza, Stockholm",
    type: "CONFERENCE",
    seatsTotal: 250,
    seatsRemaining: 0,
    isVirtual: false
  }
];

export default function EventsArchive() {
  return (
    <main className="min-h-screen bg-[#020617] pt-24 pb-20 px-6">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-16 text-center lg:text-left flex flex-col lg:row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              <Calendar className="w-3 h-3" />
              Organizational Events
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6">
              Advance Your <span className="text-primary glow-text">Horizon.</span>
            </h1>
            <p className="text-slate-400 leading-relaxed text-lg">
              Participate in specialized workshops, global conferences, and academic symposiums led by the world's most innovative space scientists.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Find events..."
                className="w-full sm:w-80 bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-600"
              />
            </div>
            <button className="glass-panel px-6 py-4 rounded-2xl border border-white/5 flex items-center justify-center gap-2 text-sm font-bold hover:bg-white/5 transition-all">
              <Filter className="w-4 h-4" />
              Type
            </button>
          </div>
        </header>

        {/* Feature Grid (Event Highlights) */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <HighlightCard 
            icon={<Trophy className="w-6 h-6" />} 
            title="Annual Conference" 
            desc="The most prestigious gathering of aerospace engineers."
            stats="2,500+ Participants"
          />
          <HighlightCard 
            icon={<FlaskConical className="w-6 h-6" />} 
            title="Technical Workshops" 
            desc="Hands-on sessions with Eka hardware and datasets."
            stats="Weekly Sessions"
          />
          <HighlightCard 
            icon={<Globe className="w-6 h-6" />} 
            title="Virtual Symposiums" 
            desc="Connect with experts from anywhere in the world."
            stats="Global Access"
          />
        </div>

        {/* Event List */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-primary/30" />
            Upcoming Events
          </h2>
          {MOCK_EVENTS.map((event: { id: string; title: string; description: string; date: string; time: string; location: string; type: string; seatsTotal: number; seatsRemaining: number; isVirtual: boolean }) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}

function HighlightCard({ icon, title, desc, stats }: any) {
  return (
    <div className="glass-panel p-8 rounded-[2rem] border border-white/5 bg-white/5 hover:border-primary/20 transition-all group">
      <div className="p-3 bg-primary/10 w-fit rounded-2xl mb-6 text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{desc}</p>
      <div className="text-[10px] font-black uppercase tracking-widest text-primary/70">{stats}</div>
    </div>
  );
}

import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight,
  Monitor
} from "lucide-react";
import Link from "next/link";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: string;
    seatsTotal: number;
    seatsRemaining: number;
    isVirtual: boolean;
  };
}

export function EventCard({ event }: EventCardProps) {
  const isFull = event.seatsRemaining === 0;

  return (
    <div className="glass-panel rounded-[2rem] border border-white/5 overflow-hidden group hover:border-primary/30 transition-all flex flex-col md:flex-row gap-6 p-6">
      {/* Event Meta/Date */}
      <div className="w-full md:w-48 flex flex-col items-center justify-center p-6 bg-primary/10 rounded-2xl border border-primary/20">
        <span className="text-sm font-black text-primary uppercase tracking-widest mb-1">
          {event.date.split(' ')[0]}
        </span>
        <span className="text-4xl font-black text-white leading-none mb-1">
          {event.date.split(' ')[1].replace(',', '')}
        </span>
        <span className="text-xs font-bold text-slate-500 uppercase">
          {event.type}
        </span>
      </div>

      {/* Event Details */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
            {event.title}
          </h3>
          {event.isVirtual && (
            <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-blue-400 uppercase bg-blue-400/10 px-3 py-1 rounded-full">
              <Monitor className="w-3 h-3" />
              Virtual
            </div>
          )}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-6 text-xs text-slate-500 font-medium pt-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary/60" />
            {event.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary/60" />
            {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary/60" />
            {event.seatsRemaining} / {event.seatsTotal} Seats Available
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center justify-center md:px-4">
        {isFull ? (
          <button className="w-full md:w-auto px-8 py-4 bg-slate-800 text-slate-500 cursor-not-allowed rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            Waitlist <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link 
            href={`/portal/events/register`}
            className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all glow-border"
          >
            Register Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Building2
} from "lucide-react";
import Link from "next/link";

interface OpportunityCardProps {
  opportunity: {
    id: string;
    title: string;
    type: string; // "VACANCY" | "INTERNSHIP"
    location: string;
    deadline: string;
    salary?: string;
    description: string;
  };
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const isInternship = opportunity.type === "INTERNSHIP";

  return (
    <div className="glass-panel rounded-[2rem] border border-white/5 overflow-hidden group hover:border-primary/30 transition-all flex flex-col md:flex-row gap-6 p-8 bg-white/5">
      {/* Icon / Meta */}
      <div className="w-full md:w-24 flex flex-col items-center justify-center p-4 bg-primary/10 rounded-2xl border border-primary/20 shrink-0">
        <Briefcase className="w-8 h-8 text-primary mb-2" />
        <span className="text-[10px] font-black text-primary uppercase tracking-tighter text-center">
          {opportunity.type}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
              {opportunity.title}
            </h3>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              <Building2 className="w-3 h-3" />
              Eka Research Division
            </div>
          </div>
          {isInternship && (
            <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
              Freshers Eligible
            </div>
          )}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
          {opportunity.description}
        </p>

        <div className="flex flex-wrap gap-6 text-xs text-slate-500 font-medium pt-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary/60" />
            {opportunity.location}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary/60" />
            Deadline: {opportunity.deadline}
          </div>
          {opportunity.salary && (
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary/60" />
              {opportunity.salary}
            </div>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center justify-center md:px-4">
        <Link 
          href={`/opportunities/${opportunity.id}/apply`}
          className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all glow-border"
        >
          Apply Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

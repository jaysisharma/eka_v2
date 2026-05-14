import { 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Heart, 
  Share2,
  Users,
  Award,
  ArrowUpRight,
  Target
} from "lucide-react";

export default function ResearcherAnalytics() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase">Publication Impact</h1>
        <p className="text-slate-500 mt-1">Deep analysis of your scientific contributions and engagement.</p>
      </header>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ImpactStat 
          label="Total Citations" 
          value="1,284" 
          icon={<Award className="w-5 h-5 text-amber-400" />} 
          change="+42 this month"
        />
        <AnalyticsStat 
          label="Avg Read Time" 
          value="6.4m" 
          change="Optimal" 
          icon={<Target className="w-5 h-5" />} 
        />
        <AnalyticsStat 
          label="Engagement Rate" 
          value="18.2%" 
          change="+2.4%" 
          icon={<ZapStatIcon className="w-5 h-5" />} 
        />
        <AnalyticsStat 
          label="Followers" 
          value="852" 
          change="+15" 
          icon={<Users className="w-5 h-5" />} 
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Engagement History */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">Monthly Engagement</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Comments</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4">
            {[30, 45, 25, 60, 40, 75, 50, 90].map((h, i) => (
              <div key={i} className="flex-1 flex gap-1 items-end h-full">
                <div className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-lg" style={{ height: `${h}%` }} />
                <div className="flex-1 bg-blue-500/20 hover:bg-blue-500 transition-all rounded-t-lg" style={{ height: `${h * 0.6}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Top Papers */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5">
          <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-8">Performance Ranking</h3>
          <div className="space-y-4">
            <RankingItem 
              rank="1" 
              title="Quantum Entanglement Phase I" 
              metric="452 Reads" 
              score={98}
            />
            <RankingItem 
              rank="2" 
              title="Hall-Effect Thruster Efficiency" 
              metric="284 Reads" 
              score={85}
            />
            <RankingItem 
              rank="3" 
              title="Autonomous Docking Protocols" 
              metric="156 Reads" 
              score={62}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactStat({ label, value, icon, change }: any) {
  return (
    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 group hover:border-primary/20 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-[8px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg border border-emerald-400/20">
          Top 1%
        </div>
      </div>
      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">{label}</div>
      <div className="text-[10px] text-slate-500 font-medium">{change}</div>
    </div>
  );
}

function AnalyticsStat({ label, value, change, icon }: any) {
  return (
    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 group hover:border-primary/20 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-[10px] font-black uppercase text-slate-500">
          {change}
        </div>
      </div>
      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">{label}</div>
    </div>
  );
}

function ZapStatIcon({ className }: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function RankingItem({ rank, title, metric, score }: any) {
  return (
    <div className="p-4 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="text-xs font-black text-slate-700">#{rank}</div>
        <div>
          <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{title}</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric}</div>
        </div>
      </div>
      <div className="text-xs font-black text-primary">{score}%</div>
    </div>
  );
}

import { 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign, 
  ArrowUpRight,
  BarChart3,
  Globe2,
  Zap
} from "lucide-react";

export default function AdminAnalytics() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase">Operational Analytics</h1>
        <p className="text-slate-500 mt-1">Real-time platform performance and institutional growth metrics.</p>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsStat 
          label="Total Revenue" 
          value="$45,280" 
          change="+12.4%" 
          icon={<DollarSign className="w-5 h-5" />} 
          trend="up"
        />
        <AnalyticsStat 
          label="Active Personnel" 
          value="1,284" 
          change="+5.2%" 
          icon={<Users className="w-5 h-5" />} 
          trend="up"
        />
        <AnalyticsStat 
          label="Research Output" 
          value="452" 
          change="+8.1%" 
          icon={<FileText className="w-5 h-5" />} 
          trend="up"
        />
        <AnalyticsStat 
          label="Sys Health" 
          value="99.9%" 
          change="Optimal" 
          icon={<Zap className="w-5 h-5" />} 
          trend="neutral"
        />
      </div>

      {/* Visual Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Growth Chart (Mock) */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-widest">User Growth Trend</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Institutional vs General Enrollment</p>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-primary rounded-full" />
              <span className="w-3 h-3 bg-blue-600 rounded-full" />
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary transition-all relative"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-[8px] font-black px-2 py-1 rounded">
                    {h * 10}
                  </div>
                </div>
                <span className="text-[8px] font-black text-slate-700 group-hover:text-slate-400">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="lg:col-span-1 glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5">
          <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-8">Research Sectors</h3>
          <div className="space-y-6">
            <CategoryProgress label="Propulsion" value={75} color="bg-primary" />
            <CategoryProgress label="Astrobiology" value={45} color="bg-blue-500" />
            <CategoryProgress label="Robotics" value={60} color="bg-emerald-500" />
            <CategoryProgress label="Logistics" value={30} color="bg-amber-500" />
            <CategoryProgress label="Quantum" value={50} color="bg-purple-500" />
          </div>
        </div>
      </div>

      {/* Global Activity */}
      <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5">
        <div className="flex items-center gap-3 mb-8">
          <Globe2 className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-bold text-white uppercase tracking-widest">Global Interaction Heatmap</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <RegionStat label="North America" value="45%" active />
          <RegionStat label="Europe" value="32%" active />
          <RegionStat label="Asia" value="15%" />
          <RegionStat label="Oceania" value="4%" />
          <RegionStat label="South America" value="3%" />
          <RegionStat label="Africa" value="1%" />
        </div>
      </div>
    </div>
  );
}

function AnalyticsStat({ label, value, change, icon, trend }: any) {
  return (
    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 group hover:border-primary/20 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${
          trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-slate-500'
        }`}>
          {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">{label}</div>
    </div>
  );
}

function CategoryProgress({ label, value, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function RegionStat({ label, value, active }: any) {
  return (
    <div className={`p-4 rounded-2xl border ${active ? 'bg-primary/5 border-primary/20' : 'bg-white/2 border-white/2 opacity-50'}`}>
      <div className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</div>
      <div className={`text-lg font-black ${active ? 'text-white' : 'text-slate-700'}`}>{value}</div>
    </div>
  );
}

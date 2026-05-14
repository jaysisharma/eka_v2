import { 
  Briefcase, 
  User, 
  FileText, 
  ExternalLink, 
  CheckCircle, 
  XCircle,
  Clock,
  Filter,
  Plus,
  MoreHorizontal,
  Search,
  Building,
  Check,
  X,
  Eye
} from "lucide-react";
import Link from "next/link";

const MOCK_APPLICATIONS = [
  {
    id: "1",
    candidate: "Liam Vance",
    email: "l.vance@caltech.edu",
    role: "Senior Propulsion Engineer",
    institution: "CalTech",
    status: "PENDING",
    submittedAt: "2026-05-07T10:00:00Z"
  },
  {
    id: "2",
    candidate: "Elena Rossi",
    email: "elena.rossi@unibo.it",
    role: "Astrobiology Research Intern",
    institution: "University of Bologna",
    status: "REVIEWED",
    submittedAt: "2026-05-06T14:20:00Z"
  },
  {
    id: "3",
    candidate: "Marcus Thorne",
    email: "m.thorne@mit.edu",
    role: "Orbital Mechanics Specialist",
    institution: "MIT",
    status: "PENDING",
    submittedAt: "2026-05-08T09:15:00Z"
  }
];

export default function AdminOpportunities() {
  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Recruitment</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">Manage institutional vacancies and candidate dossiers</p>
        </div>
        <button className="bg-[#0B1120] text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-lg shadow-slate-200 hover:bg-emerald-600 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Post Opportunity
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Active Openings" 
          value="12" 
          icon={<Briefcase className="w-5 h-5 text-emerald-500" />}
          color="bg-emerald-50"
        />
        <StatCard 
          label="Total Applicants" 
          value="452" 
          icon={<FileText className="w-5 h-5 text-indigo-500" />}
          color="bg-indigo-50"
        />
        <StatCard 
          label="Awaiting Review" 
          value="28" 
          icon={<Clock className="w-5 h-5 text-amber-500" />}
          color="bg-amber-50"
        />
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search applications..."
            className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500/30 text-sm text-slate-600 rounded-md transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-md text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-all">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Candidate</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Applied For</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_APPLICATIONS.map((app) => (
                <tr key={app.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.email}`} 
                        alt={app.candidate} 
                        className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 object-cover"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-800 leading-none">{app.candidate}</div>
                        <div className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">{app.institution}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-sm font-bold text-slate-700 leading-tight">{app.role}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(app.submittedAt).toLocaleDateString("en-US", { day: 'numeric', month: 'short' })}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <span className={`px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                        app.status === "PENDING" 
                          ? "bg-amber-50 text-amber-600 border-amber-100" 
                          : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-md transition-all" title="View CV">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-md transition-all" title="Authorize">
                        <Check className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all" title="Decline">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${color} rounded-md transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-800 leading-none">{value}</div>
          <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </div>
  );
}

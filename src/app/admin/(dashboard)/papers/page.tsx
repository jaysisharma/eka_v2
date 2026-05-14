import prisma from "@/lib/prisma";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  MoreHorizontal,
  Check,
  X,
  Eye,
  Download,
  AlertCircle,
  ShieldCheck,
  Users
} from "lucide-react";
import Link from "next/link";

export default async function AdminPapers() {
  const [papers, pendingCount, totalCount] = await Promise.all([
    prisma.researchPaper.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.researchPaper.count({ where: { status: "PENDING_APPROVAL" } }),
    prisma.researchPaper.count({ where: { status: "PUBLISHED" } })
  ]);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Research Moderation</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">Review and authorize scientific publications</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-slate-600 border border-slate-200 px-5 py-2.5 rounded-md text-sm font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Archive
          </button>
          <button className="bg-[#0B1120] text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-lg shadow-slate-200 hover:bg-emerald-600 transition-all flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Policy Settings
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Active Publications" 
          value={totalCount.toString()} 
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          color="bg-emerald-50"
        />
        <StatCard 
          label="Awaiting Approval" 
          value={pendingCount.toString()} 
          icon={<Clock className="w-5 h-5 text-amber-500" />}
          isAlert={pendingCount > 0}
          color="bg-amber-50"
        />
        <StatCard 
          label="Total Contributors" 
          value="156" 
          icon={<Users className="w-5 h-5 text-indigo-500" />}
          color="bg-indigo-50"
        />
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search by title, author or DOI..."
            className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500/30 text-sm text-slate-600 rounded-md transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-slate-100 p-1 rounded-md flex gap-1">
            <button className="px-3 py-1.5 text-xs font-bold bg-white text-emerald-600 rounded shadow-sm">All</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">Pending</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">Flagged</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-md text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Papers Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Publication Details</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Author</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {papers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="text-sm font-semibold">No publications found in archive</p>
                    </div>
                  </td>
                </tr>
              ) : (
                papers.map((paper) => (
                  <tr key={paper.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <div className="text-sm font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1">{paper.title}</div>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{new Date(paper.createdAt).toLocaleDateString()}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">{paper.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${paper.author.email}`} 
                          alt={paper.author.name || "Author"} 
                          className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200"
                        />
                        <div className="text-xs font-bold text-slate-600">{paper.author.name || "Anonymous"}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <span className={`px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                          paper.status === "PUBLISHED" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : paper.status === "PENDING_APPROVAL"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}>
                          {paper.status.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-md transition-all" title="View Manuscript">
                          <Eye className="w-4 h-4" />
                        </button>
                        {paper.status === "PENDING_APPROVAL" && (
                          <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-md transition-all" title="Authorize">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all" title="Flag/Reject">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, isAlert }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      {isAlert && <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/10 rounded-bl-full flex items-center justify-center pl-3 pb-3">
        <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse" />
      </div>}
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

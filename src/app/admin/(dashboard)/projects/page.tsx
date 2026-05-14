import prisma from "@/lib/prisma";
import { Rocket, Activity, CheckCircle, Globe, Layout, Briefcase, Zap } from "lucide-react";
import { ProjectList } from "./project-list";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === "ONGOING").length;
  const completedProjects = projects.filter(p => p.status === "COMPLETED").length;

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Mission Projects</h2>
        <p className="text-slate-400 text-sm mt-1 font-medium">Manage and track institutional research initiatives</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Initiatives" 
          value={totalProjects.toString()} 
          icon={<Globe className="w-5 h-5 text-indigo-500" />}
          color="bg-indigo-50"
        />
        <StatCard 
          label="Active Operations" 
          value={activeProjects.toString()} 
          icon={<Zap className="w-5 h-5 text-amber-500" />}
          color="bg-amber-50"
        />
        <StatCard 
          label="Mission Success" 
          value={completedProjects.toString()} 
          icon={<CheckCircle className="w-5 h-5 text-emerald-500" />}
          color="bg-emerald-50"
        />
      </div>

      <ProjectList initialProjects={projects} />
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-4 ${color} rounded-md transition-transform group-hover:scale-110`}>
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

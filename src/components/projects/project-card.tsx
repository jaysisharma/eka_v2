import {
  Users,
  Activity,
  ArrowRight,
  Calendar,
} from "lucide-react";

import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    progress: number;
    status: string;
    collaborators: number;
    category: string;
    date: string;
  };
}

export function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <div className="glass-panel rounded-[2rem] border border-white/5 overflow-hidden group hover:border-primary/30 transition-all flex flex-col h-full">

      {/* Category & Status */}
      <div className="p-8 pb-4 flex justify-between items-center">
        <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black tracking-widest text-primary uppercase">
          {project.category}
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <Activity className="w-3 h-3 text-emerald-400" />
          {project.status}
        </div>
      </div>

      {/* Title & Description */}
      <div className="px-8 flex-1">
        <h3 className="text-2xl font-bold text-white mb-4 line-clamp-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8">
          {project.description}
        </p>

        {/* Progress */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-500">
              Mission Progress
            </span>

            <span className="text-white">
              {project.progress}%
            </span>
          </div>

          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-1000 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-8 pt-6 mt-auto border-t border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <Users className="w-4 h-4" />
            {project.collaborators} Personnel
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            {project.date}
          </div>

        </div>

        <Link
          href={`/projects/${project.id}`}
          className="p-3 bg-white/5 rounded-xl text-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
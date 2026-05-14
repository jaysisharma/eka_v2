"use client";

import { Trash2, Edit3, Rocket, CheckCircle, Clock, Archive, Hash, MoreVertical, Users, Calendar } from "lucide-react";
import { updateProjectStatus, deleteProject } from "./actions";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
export type ProjectStatus = "PLANNED" | "ONGOING" | "COMPLETED" | "ARCHIVED";

const statusConfig: Record<ProjectStatus, { icon: any, color: string, bg: string, border: string }> = {
  PLANNED: { icon: Clock, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  ONGOING: { icon: Rocket, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  COMPLETED: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  ARCHIVED: { icon: Archive, color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-200" },
};

export function ProjectCard({ project }: { project: any }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const config = statusConfig[project.status as ProjectStatus];
  const StatusIcon = config.icon;

  const handleStatusChange = async (newStatus: ProjectStatus) => {
    setIsUpdating(true);
    await updateProjectStatus(project.id, newStatus);
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    await deleteProject(project.id);
  };

  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      {/* Cover Image */}
      <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <Rocket className="w-12 h-12 text-slate-200 group-hover:text-emerald-500/20 transition-colors" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-2.5 py-1 flex items-center gap-2 rounded-md border shadow-sm backdrop-blur-md ${config.bg} ${config.color} ${config.border}`}>
          <StatusIcon className="w-3 h-3" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{project.status}</span>
        </div>

        {/* Action Overlay */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 bg-white/90 hover:bg-rose-500 hover:text-white text-slate-400 rounded-md shadow-sm transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-500 text-[10px] font-bold uppercase tracking-widest">
            <Hash className="w-3 h-3" />
            MIS-{project.id.slice(-4).toUpperCase()}
          </div>
          <h3 className="text-base font-bold text-slate-800 leading-tight line-clamp-1">{project.title}</h3>
        </div>

        <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {project.description || "No mission objectives specified for this research initiative."}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img 
                key={i}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=member${i}${project.id}`} 
                alt="Member"
                className="w-7 h-7 rounded-full border-2 border-white bg-slate-100"
              />
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">
              +
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(project.createdAt).toLocaleDateString("en-US", { month: 'short', year: '2-digit' })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-auto border-t border-slate-50">
          <div className="flex items-center justify-between gap-3">
            <select 
              value={project.status}
              onChange={(e) => handleStatusChange(e.target.value as ProjectStatus)}
              disabled={isUpdating}
              className="bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-600 px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 rounded-md cursor-pointer flex-1 transition-colors"
            >
              <option value="PLANNED">Planned</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
            </select>
            <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-md transition-all">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Terminate Mission Initiative"
        message={`Are you sure you want to permanently delete "${project.title}"? This action is irreversible.`}
        isDestructive={true}
        confirmText="Confirm Termination"
      />
    </div>
  );
}

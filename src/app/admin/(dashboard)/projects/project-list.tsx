"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Filter, Rocket, Activity, X, LayoutGrid } from "lucide-react";
import { ProjectCard } from "./project-card";
import { Modal } from "@/components/ui/modal";
import { createProject } from "./actions";
export type ProjectStatus = "PLANNED" | "ONGOING" | "COMPLETED" | "ARCHIVED";

export function ProjectList({ initialProjects }: { initialProjects: any[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ProjectStatus>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    status: "ONGOING" as ProjectStatus,
    tags: "",
  });

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                           p.description?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [initialProjects, search, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await createProject({
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()).filter(t => t),
    });
    
    if (result.success) {
      setIsModalOpen(false);
      setFormData({ title: "", description: "", image: "", status: "ONGOING", tags: "" });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-6 items-center justify-between">
        <div className="flex bg-slate-100 p-1 rounded-md w-full xl:w-auto overflow-x-auto no-scrollbar">
          {["ALL", "PLANNED", "ONGOING", "COMPLETED", "ARCHIVED"].map((s) => (
            <button 
              key={s}
              onClick={() => setStatusFilter(s as any)}
              className={`px-4 py-2 text-xs font-bold transition-all rounded-md whitespace-nowrap ${
                statusFilter === s 
                  ? "bg-white text-emerald-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto xl:flex-1 xl:max-w-3xl justify-end">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search initiatives..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500/30 text-sm text-slate-600 rounded-md transition-all"
            />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0B1120] text-white px-6 py-2.5 rounded-md text-sm font-bold shadow-lg shadow-slate-200 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Mission
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-xl border border-dashed border-slate-200 text-slate-400">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <LayoutGrid className="w-8 h-8 opacity-20" />
          </div>
          <p className="text-sm font-semibold">No initiatives found in this sector</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Initialize New Project"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Project Title</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-emerald-500 rounded-md transition-all font-medium"
              placeholder="e.g., Mission Eka Alpha"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Project Summary</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-emerald-500 rounded-md h-24 resize-none transition-all font-medium"
              placeholder="Primary objectives and scope..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Operational Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as ProjectStatus})}
                className="w-full bg-slate-50 border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-emerald-500 rounded-md transition-all font-bold cursor-pointer"
              >
                <option value="PLANNED">Planned</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tags (Comma Sep)</label>
              <input 
                type="text" 
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-emerald-500 rounded-md transition-all font-medium"
                placeholder="Mars, Rocketry..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cover Image URL</label>
            <input 
              type="url" 
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-emerald-500 rounded-md transition-all font-medium"
              placeholder="https://..."
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0B1120] text-white py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all disabled:opacity-50 mt-4 shadow-xl shadow-slate-200"
          >
            {isSubmitting ? "TRANSMITTING..." : "AUTHORIZE MISSION"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

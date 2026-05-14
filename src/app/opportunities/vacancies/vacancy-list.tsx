"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, Clock, Briefcase, ChevronRight, X } from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  salary: string | null;
  requirements: string;
  deadline: Date;
  createdAt: Date;
}

export default function VacancyList({ initialOpportunities }: { initialOpportunities: Opportunity[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedJob, setSelectedJob] = useState<Opportunity | null>(null);

  const filteredJobs = useMemo(() => {
    return initialOpportunities.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                           job.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "ALL" || job.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [initialOpportunities, search, filter]);

  return (
    <div className="space-y-12">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex gap-4">
          {["ALL", "VACANCY", "INTERNSHIP"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 text-[11px] font-bold tracking-wider transition-all rounded-md ${
                filter === t 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
                : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-white/5 rounded-3xl border border-white/5">
            <p className="text-slate-500 font-medium italic">No open positions matching your search at this time.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div 
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="group bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/[0.08] hover:border-white/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-bold rounded uppercase tracking-widest border border-primary/20">
                    {job.type}
                  </span>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-slate-400 text-xs">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        {job.salary}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="pt-4 flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-widest group-hover:gap-3 transition-all">
                  View Mission Details <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-all" />
            </div>
          ))
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#0B1120] border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12 space-y-10">
              <header className="space-y-6">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded uppercase tracking-wider">
                  {selectedJob.type}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  {selectedJob.title}
                </h2>
                <div className="flex flex-wrap gap-6 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {selectedJob.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    {selectedJob.salary || "Competitive"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Apply by {new Date(selectedJob.deadline).toLocaleDateString()}
                  </div>
                </div>
              </header>

              <div className="grid md:grid-cols-2 gap-12 border-t border-white/5 pt-10">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">The Mission</h4>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {selectedJob.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Requirements</h4>
                  <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-wrap">
                    {selectedJob.requirements}
                  </p>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                <p className="text-slate-500 text-xs italic">
                  Eka is an equal opportunity employer committed to orbital diversity.
                </p>
                <button className="w-full md:w-auto bg-primary hover:bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/10">
                  Apply for this Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

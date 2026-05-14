"use client";

import { useState, useMemo } from "react";
import { Search, Mail, ExternalLink, Globe, User, Microscope, Award, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Researcher } from "./page";

export default function ResearcherList({ initialResearchers }: { initialResearchers: Researcher[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Propulsion", "Astrobiology", "Physics", "Orbital Architect"];

  const filteredResearchers = useMemo(() => {
    return initialResearchers.filter(res => {
      const matchesSearch = res.name?.toLowerCase().includes(search.toLowerCase()) || 
                           res.bio?.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [initialResearchers, search]);

  return (
    <div className="space-y-12 w-full">
      {/* Search & Filter Header - Matching Papers Design */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between border-b border-white/10 pb-12">
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search registry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-sm text-white focus:border-primary/50 outline-none transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        Registry contains <span className="text-white">{filteredResearchers.length}</span> Active Personnel
      </div>

      {/* Full Width Dossier Rows */}
      <div className="space-y-6">
        {filteredResearchers.map((res) => (
          <div 
            key={res.id}
            className="group relative bg-white/5 border border-white/5 p-8 md:p-10 hover:bg-white/[0.07] hover:border-primary/30 transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Profile Avatar - Large, Journal Style */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <img 
                  src={res.image || "https://images.unsplash.com/photo-1531297484001-80022131f5a1"} 
                  alt={res.name || ""} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 to-transparent" />
              </div>

              {/* Main Info */}
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] border border-primary/30 px-2 py-0.5">
                    {res.id.includes("1") ? "Lead Scientist" : "Research Fellow"}
                  </span>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <Microscope className="w-4 h-4 text-primary/40" />
                    Global Scientific Network
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                    {res.name}
                  </h3>
                  <p className="text-primary text-[11px] font-black uppercase tracking-[0.3em]">
                    Department of Orbital Architecture
                  </p>
                </div>

                <p className="text-slate-400 text-base leading-relaxed max-w-4xl font-light italic border-l-2 border-white/5 pl-6">
                  {res.bio || "Dedicated to advancing mission-critical systems and orbital mechanics through interdisciplinary collaboration and systemic innovation."}
                </p>

                <div className="flex gap-6 pt-2">
                  <button className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <Mail className="w-4 h-4" /> Message
                  </button>
                  <button className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <Globe className="w-4 h-4" /> Portfolio
                  </button>
                  <button className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <ExternalLink className="w-4 h-4" /> Network
                  </button>
                </div>
              </div>

              {/* Sidebar Actions - Precise and Scholarly */}
              <div className="flex md:flex-col gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
                <Link 
                  href={`/researchers/${res.id}`}
                  className="flex-1 md:w-44 bg-primary text-primary-foreground px-6 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
                >
                  <User className="w-4 h-4" /> View Dossier
                </Link>
                <button className="flex-1 md:w-44 bg-white/5 border border-white/10 text-white px-6 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <Award className="w-4 h-4" /> Endorsements
                </button>
                <div className="flex gap-3">
                  <button className="flex-1 md:flex-none p-4 bg-white/5 border border-white/10 text-slate-400 hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button className="flex-1 md:flex-none p-4 bg-white/5 border border-white/10 text-slate-400 hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tactical Registry Marker */}
            <div className="absolute top-8 right-8 text-[9px] font-mono text-slate-700 hidden lg:block uppercase tracking-widest">
              FACULTY-ID: 0{res.id.substring(0,6).toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

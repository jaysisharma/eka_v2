"use client";

import { useState, useMemo } from "react";
import { Search, FileText, Download, Bookmark, Share2, ExternalLink, Calendar, User } from "lucide-react";
import Link from "next/link";

interface Paper {
  id: string;
  title: string;
  abstract: string;
  category: string;
  tags: string[];
  publishedAt: string;
  visibility: string;
  author: {
    name: string | null;
  };
}

export default function PaperList({ initialPapers }: { initialPapers: Paper[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(initialPapers.map(p => p.category)))];

  const filteredPapers = useMemo(() => {
    return initialPapers.filter(paper => {
      const matchesSearch = paper.title.toLowerCase().includes(search.toLowerCase()) || 
                           paper.abstract.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || paper.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialPapers, search, activeCategory]);

  return (
    <div className="space-y-12">
      {/* Controls */}
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
            placeholder="Search the registry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-sm text-white focus:border-primary/50 outline-none transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        Showing <span className="text-white">{filteredPapers.length}</span> Published Manuscripts
      </div>

      {/* Paper Cards */}
      <div className="space-y-6">
        {filteredPapers.map((paper) => (
          <div 
            key={paper.id}
            className="group bg-white/5 border border-white/5 p-8 md:p-10 hover:bg-white/[0.07] hover:border-primary/30 transition-all duration-500 relative"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] border border-primary/30 px-2 py-0.5">
                    {paper.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {new Date(paper.publishedAt).toLocaleDateString()}
                  </div>
                  {paper.visibility === "PREMIUM" && (
                    <span className="text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded">
                      PREMIUM ACCESS
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                    {paper.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-medium italic">
                    <User className="w-4 h-4 text-primary/60" />
                    Authored by {paper.author.name || "Eka Researcher"}
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed text-sm line-clamp-3 font-jakarta font-light">
                  {paper.abstract}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {paper.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-slate-500 bg-white/5 px-2 py-1 uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex md:flex-col gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                <button className="flex-1 md:w-40 bg-primary text-primary-foreground px-4 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> View Full
                </button>
                <button className="flex-1 md:w-40 bg-white/5 border border-white/10 text-white px-4 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download
                </button>
                <div className="flex gap-2">
                  <button className="p-3 bg-white/5 border border-white/10 text-slate-400 hover:text-primary hover:border-primary/50 transition-all">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-3 bg-white/5 border border-white/10 text-slate-400 hover:text-primary hover:border-primary/50 transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* DOI Simulation */}
            <div className="absolute top-8 right-8 text-[9px] font-mono text-slate-600 hidden lg:block">
              DOI: 10.EKA-RES/{paper.id.substring(0,8).toUpperCase()}
            </div>
          </div>
        ))}

        {filteredPapers.length === 0 && (
          <div className="py-32 text-center bg-white/5 border border-white/5">
            <p className="text-slate-500 italic">No research papers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

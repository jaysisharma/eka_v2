"use client";

import { useState } from "react";
import { 
  Search as SearchIcon, 
  FileText, 
  Calendar, 
  Rocket, 
  User, 
  ArrowRight,
  Filter,
  Loader2,
  X
} from "lucide-react";
import Link from "next/link";

const MOCK_RESULTS = [
  { id: "1", type: "PAPER", title: "Quantum Entanglement in Deep Space", meta: "Dr. Alistair Thorne", date: "May 2026" },
  { id: "2", type: "EVENT", title: "Propulsion Symposium 2026", meta: "Oslo, Norway", date: "June 12" },
  { id: "3", type: "PROJECT", title: "Orbital-01 Quantum Relay", meta: "75% Complete", date: "Active" },
  { id: "4", type: "RESEARCHER", title: "Dr. Elena Vance", meta: "Astrobiology Lead", date: "Eka Research" },
];

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);

  const filteredResults = MOCK_RESULTS.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || item.type === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Search Input */}
        <div className="mb-12">
          <div className="relative group">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across the Eka ecosystem..."
              className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] py-8 pl-16 pr-20 text-2xl font-bold text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700 shadow-2xl"
            />
            {query && (
              <button 
                onClick={() => setQuery("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16 items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 mr-2">Filter by Category:</span>
          <CategoryButton active={activeCategory === "ALL"} onClick={() => setActiveCategory("ALL")} label="All Results" />
          <CategoryButton active={activeCategory === "PAPER"} onClick={() => setActiveCategory("PAPER")} label="Research Papers" />
          <CategoryButton active={activeCategory === "PROJECT"} onClick={() => setActiveCategory("PROJECT")} label="Missions" />
          <CategoryButton active={activeCategory === "EVENT"} onClick={() => setActiveCategory("EVENT")} label="Events" />
          <CategoryButton active={activeCategory === "RESEARCHER"} onClick={() => setActiveCategory("RESEARCHER")} label="Personnel" />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Querying Archives...</span>
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <SearchResultCard key={`${item.type}-${item.id}`} item={item} />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 font-medium">No records found matching your query.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function CategoryButton({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
        active 
          ? "bg-primary text-primary-foreground border-primary glow-border" 
          : "bg-white/5 text-slate-400 border-white/5 hover:border-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function SearchResultCard({ item }: any) {
  const getIcon = () => {
    switch (item.type) {
      case "PAPER": return <FileText className="w-5 h-5" />;
      case "EVENT": return <Calendar className="w-5 h-5" />;
      case "PROJECT": return <Rocket className="w-5 h-5" />;
      case "RESEARCHER": return <User className="w-5 h-5" />;
      default: return <SearchIcon className="w-5 h-5" />;
    }
  };

  const getPath = () => {
    switch (item.type) {
      case "PAPER": return `/research/${item.id}`;
      case "EVENT": return `/events`;
      case "PROJECT": return `/projects`;
      case "RESEARCHER": return `/researchers/${item.id}`;
      default: return "#";
    }
  };

  return (
    <Link 
      href={getPath()}
      className="glass-panel p-6 rounded-[1.5rem] border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all bg-white/5"
    >
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:bg-primary/10 transition-all">
          {getIcon()}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/70">{item.type}</span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-700">{item.date}</span>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
          <p className="text-xs text-slate-500 mt-1">{item.meta}</p>
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-slate-800 group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

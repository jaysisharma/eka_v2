"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Inbox, Clock, History } from "lucide-react";
import { VerificationCard } from "./verification-card";

const ITEMS_PER_PAGE = 6;

export function VerificationList({ initialCandidates }: { initialCandidates: any[] }) {
  const [tab, setTab] = useState<"PENDING" | "HISTORY">("PENDING");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCandidates = useMemo(() => {
    return initialCandidates.filter((c) => {
      const matchesTab = tab === "PENDING" ? c.academicStatus === "PENDING" : c.academicStatus !== "PENDING";
      const matchesSearch = 
        (c.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (c.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (c.institutionDetails?.toLowerCase() || "").includes(search.toLowerCase());
      
      return matchesTab && matchesSearch;
    });
  }, [initialCandidates, tab, search]);

  const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);
  const paginatedCandidates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCandidates.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCandidates, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useMemo(() => {
    setCurrentPage(1);
  }, [tab, search]);

  return (
    <div className="space-y-8">
      {/* Tabs & Search Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex bg-slate-100 p-1 rounded-md w-full lg:w-auto">
          <TabButton 
            active={tab === "PENDING"} 
            onClick={() => setTab("PENDING")}
            label="Active Queue"
            icon={<Clock className="w-4 h-4" />}
          />
          <TabButton 
            active={tab === "HISTORY"} 
            onClick={() => setTab("HISTORY")}
            label="Audit History"
            icon={<History className="w-4 h-4" />}
          />
        </div>

        <div className="relative w-full lg:w-[400px] group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text"
            placeholder="Search by name, email or institution..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500/30 text-sm text-slate-600 rounded-md transition-all"
          />
        </div>
      </div>

      {/* Results Grid */}
      {paginatedCandidates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-xl border border-dashed border-slate-200 text-slate-400">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <Inbox className="w-8 h-8 opacity-20" />
          </div>
          <p className="text-sm font-semibold">No dossiers found in this section</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCandidates.map((candidate) => (
            <VerificationCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-10 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-400">
            Showing dossier <span className="text-slate-700">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> to <span className="text-slate-700">{Math.min(currentPage * ITEMS_PER_PAGE, filteredCandidates.length)}</span> of <span className="text-slate-700">{filteredCandidates.length}</span> Candidates
          </div>
          
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-white disabled:opacity-30 transition-all rounded-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`min-w-[32px] h-8 px-2 text-xs font-bold transition-all rounded-md ${
                    currentPage === i + 1 
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                      : "border border-slate-200 text-slate-400 hover:bg-white hover:text-slate-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-white disabled:opacity-30 transition-all rounded-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, label, icon }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 text-xs font-bold transition-all rounded-md flex items-center justify-center gap-2 flex-1 lg:flex-none ${
        active 
          ? "bg-white text-emerald-600 shadow-sm" 
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

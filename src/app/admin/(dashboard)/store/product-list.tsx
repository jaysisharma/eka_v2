"use client";

import { useState, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Package, 
  LayoutGrid, 
  List, 
  Download, 
  ChevronDown, 
  SlidersHorizontal 
} from "lucide-react";
import { ProductCard } from "./product-card";
import Link from "next/link";

export function ProductList({ initialProducts }: { initialProducts: any[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const counts = useMemo(() => {
    return {
      all: initialProducts.length,
      available: initialProducts.filter(p => p.stock > 0).length,
      disabled: initialProducts.filter(p => p.stock === 0).length,
    };
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                           p.description?.toLowerCase().includes(search.toLowerCase());
      
      let matchesStatus = true;
      if (statusFilter === "AVAILABLE") matchesStatus = p.stock > 0;
      if (statusFilter === "DISABLED") matchesStatus = p.stock === 0;

      return matchesSearch && matchesStatus;
    });
  }, [initialProducts, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <TabButton 
          label="All" 
          count={counts.all} 
          active={statusFilter === "ALL"} 
          onClick={() => setStatusFilter("ALL")} 
        />
        <TabButton 
          label="Available" 
          count={counts.available} 
          active={statusFilter === "AVAILABLE"} 
          onClick={() => setStatusFilter("AVAILABLE")} 
        />
        <TabButton 
          label="Disabled" 
          count={counts.disabled} 
          active={statusFilter === "DISABLED"} 
          onClick={() => setStatusFilter("DISABLED")} 
        />
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-11 pr-12 focus:outline-none focus:bg-white focus:border-emerald-500/30 text-sm text-slate-600 rounded-lg transition-all"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-white text-emerald-500 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-white text-emerald-500 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
            <span>Export</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <Link 
            href="/admin/store/new"
            className="bg-emerald-500 text-white p-2.5 rounded-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-5 h-5" />
          </Link>

          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <span>Actions</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 bg-white rounded-xl border border-dashed border-slate-200 text-slate-400">
          <Package className="w-16 h-16 mb-4 opacity-20" />
          <div className="text-sm font-semibold">No products found matching your search.</div>
        </div>
      ) : (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "flex flex-col gap-4"
        }>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}

function TabButton({ 
  label, 
  count, 
  active, 
  onClick 
}: { 
  label: string; 
  count: number; 
  active: boolean; 
  onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className={`relative px-6 py-4 flex items-center gap-2 text-sm font-semibold transition-all ${
        active ? "text-emerald-500" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {label}
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
        active ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
      }`}>
        {count}
      </span>
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-t-full shadow-[0_-2px_6px_rgba(16,185,129,0.4)]" />
      )}
    </button>
  );
}

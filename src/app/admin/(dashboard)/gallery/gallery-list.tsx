"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Filter, Layers, AlertCircle, Grid, List, UploadCloud } from "lucide-react";
import { MediaCard } from "./media-card";
import { Modal } from "@/components/ui/modal";
import { uploadMedia } from "./actions";

export function GalleryList({ initialMedia }: { initialMedia: any[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [newCategory, setNewCategory] = useState("SPACE");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamic Categories from Data
  const categories = useMemo(() => {
    const existing = Array.from(new Set(initialMedia.map(m => m.category.toUpperCase())));
    const defaults = ["SPACE", "RESEARCH", "EVENTS", "PROJECT"];
    return Array.from(new Set(["ALL", ...defaults, ...existing]));
  }, [initialMedia]);

  const filteredMedia = useMemo(() => {
    return initialMedia.filter((m) => {
      const matchesSearch = (m.caption?.toLowerCase() || "").includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "ALL" || m.category.toUpperCase() === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [initialMedia, search, categoryFilter]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);

    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB limit.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      if (!caption) setCaption(selectedFile.name.split('.')[0]);
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const finalCategory = isCustom ? customCategory.toUpperCase() : newCategory;
    if (!finalCategory) {
      setError("Category is required.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadMedia(formData, finalCategory, caption);
    
    if (result.success) {
      setIsAddModalOpen(false);
      setFile(null);
      setCaption("");
      setCustomCategory("");
      setIsCustom(false);
      setError(null);
    } else {
      setError("Upload failed.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      {/* Redesigned Command Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Category Filters (Left) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0 w-full lg:w-auto">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-md border shadow-sm whitespace-nowrap ${
                categoryFilter === cat 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                  : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Add Media (Right) */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500/30 text-sm text-slate-600 rounded-md transition-all"
            />
          </div>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#0B1120] text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-lg shadow-slate-200 hover:bg-emerald-600 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Upload Media
          </button>
        </div>
      </div>

      {/* Grid Architecture */}
      {filteredMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white border border-slate-200 rounded-xl text-slate-400">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 opacity-20" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest opacity-40">No media found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredMedia.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </div>
      )}

      {/* Upload Modal Refinement */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Upload New Media"
      >
        <form onSubmit={handleAddMedia} className="space-y-6 pt-4">
          <div className="space-y-2.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select File (Max 2MB)</label>
            <div className="relative group">
              <input 
                type="file" 
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full bg-slate-50 border-2 border-slate-200 border-dashed p-10 text-center rounded-xl group-hover:border-emerald-500/50 group-hover:bg-emerald-50/10 transition-all flex flex-col items-center gap-3">
                <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-lg text-slate-400 group-hover:text-emerald-500 transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-800 mb-1">
                    {file ? file.name : "Choose File"}
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Images or videos</div>
                </div>
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase tracking-widest bg-rose-50 p-3 rounded-md border border-rose-100">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Media Title</label>
            <input 
              type="text"
              placeholder="Enter a descriptive title..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 rounded-md font-bold shadow-sm"
              required
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</label>
              <button 
                type="button"
                onClick={() => setIsCustom(!isCustom)}
                className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {isCustom ? "Use Existing" : "New Category"}
              </button>
            </div>

            {isCustom ? (
              <input 
                type="text"
                placeholder="Enter custom category..."
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full bg-white border border-slate-200 p-3.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 rounded-md font-bold shadow-sm"
                autoFocus
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {["SPACE", "RESEARCH", "EVENTS", "PROJECT"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewCategory(cat)}
                    className={`p-3 text-[10px] font-bold uppercase tracking-widest border transition-all rounded-md shadow-sm ${
                      newCategory === cat 
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600 font-bold" 
                        : "border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || !!error || !file}
            className="w-full bg-[#0B1120] text-white py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all disabled:opacity-50 shadow-lg shadow-slate-200 mt-2"
          >
            {isSubmitting ? "Uploading..." : "Upload Media"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

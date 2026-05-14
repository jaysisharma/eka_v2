"use client";

import { useState, useMemo } from "react";
import {
  X,
  PlayCircle
} from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  caption: string | null;
  type: "IMAGE" | "VIDEO";
  category: string;
  createdAt: Date;
}

export default function GalleryContent({ initialMedia }: { initialMedia: MediaItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const categories = ["All", "Research", "Space", "Events", "Project", "Organization"];

  const filteredMedia = useMemo(() => {
    return initialMedia.filter(item => {
      if (activeCategory === "All") return true;
      return item.category.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [initialMedia, activeCategory]);

  return (
    <div className="space-y-12">
      {/* Centered Minimalist Filter */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 border-b border-white/10 pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative text-[11px] font-bold tracking-wider transition-all py-2 ${activeCategory === cat
                ? "text-primary"
                : "text-slate-500 hover:text-white"
              }`}
          >
            {activeCategory === cat && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-primary shadow-[0_0_8px_rgba(186,159,89,0.5)]" />
            )}
            {cat}
          </button>
        ))}
      </div>

      {/* Dynamic Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredMedia.map((item) => (
          <div 
            key={item.id}
            className="group relative overflow-hidden bg-white/5 border border-white/5 cursor-pointer rounded-2xl break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
            onClick={() => setSelectedMedia(item)}
          >
            {item.type === "IMAGE" ? (
              <img 
                src={item.url || "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000"} 
                alt={item.caption || ""} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            ) : (
              <div className="aspect-video w-full flex items-center justify-center bg-white/10">
                <PlayCircle className="w-16 h-16 text-white/30 group-hover:text-primary transition-colors" />
              </div>
            )}
            
            {/* Subtle Info Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <div className="space-y-1">
                <p className="text-white text-sm font-bold tracking-tight">{item.caption || "View Detail"}</p>
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{item.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-8 right-8 p-3 text-white hover:text-primary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-6xl flex flex-col items-center">
            {selectedMedia.type === "IMAGE" ? (
              <img src={selectedMedia.url} alt="" className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10 rounded-2xl" />
            ) : (
              <video src={selectedMedia.url} controls autoPlay className="max-w-full max-h-[80vh] shadow-2xl rounded-2xl" />
            )}

            <div className="mt-12 text-center space-y-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">{selectedMedia.caption || "Gallery Asset"}</h3>
              <p className="text-primary text-xs font-semibold tracking-wider capitalize">{selectedMedia.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

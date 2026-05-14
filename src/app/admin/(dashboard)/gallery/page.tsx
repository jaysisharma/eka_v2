import prisma from "@/lib/prisma";
import { ImageIcon, Film, Globe, Activity, Database, Zap } from "lucide-react";
import { GalleryList } from "./gallery-list";

export default async function AdminGallery() {
  const media = await prisma.galleryMedia.findMany({
    orderBy: { createdAt: "desc" }
  });

  const totalAssets = media.length;
  const videoCount = media.filter(m => m.type === "VIDEO").length;
  const imageCount = media.filter(m => m.type === "IMAGE").length;

  return (
    <div className="mx-auto space-y-10 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Media Gallery</h1>
          <p className="text-slate-400 text-sm font-medium">Manage and organize institutional media assets</p>
        </div>
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 min-w-[300px]">
          <HeaderStat 
            label="Total Assets" 
            value={totalAssets} 
            icon={<Database className="w-3.5 h-3.5 text-indigo-500" />}
            bg="bg-indigo-50"
          />
          <HeaderStat 
            label="Videos" 
            value={videoCount} 
            icon={<Film className="w-3.5 h-3.5 text-amber-500" />}
            bg="bg-amber-50"
          />
          <HeaderStat 
            label="Images" 
            value={imageCount} 
            icon={<ImageIcon className="w-3.5 h-3.5 text-emerald-500" />}
            bg="bg-emerald-50"
          />
        </div>
      </div>

      <GalleryList initialMedia={media} />
    </div>
  );
}

function HeaderStat({ label, value, icon, bg }: any) {
  return (
    <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm flex flex-col gap-1 hover:shadow-md transition-all">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 ${bg} rounded-md`}>
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-xl font-bold text-slate-800 tracking-tight pl-0.5">{value.toLocaleString()}</span>
    </div>
  );
}

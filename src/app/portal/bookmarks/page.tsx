import { Bookmark, FileText, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";

const BOOKMARKS = [
  { id: "1", title: "Quantum Entanglement in Deep Space", category: "PROPULSION", reads: "1.2k" },
  { id: "2", title: "Autonomous Docking Protocols", category: "ROBOTICS", reads: "852" },
];

export default function MyBookmarks() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Research Archives</h1>
        <p className="text-slate-500 mt-1">Access your bookmarked technical papers and mission reports.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {BOOKMARKS.map((item) => (
          <Link 
            key={item.id} 
            href={`/research/${item.id}`}
            className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 group hover:border-primary/20 transition-all block relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
              <Bookmark className="w-12 h-12 text-primary" fill="currentColor" />
            </div>
            
            <div className="space-y-4">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <Eye className="w-3.5 h-3.5" />
                  {item.reads} Reads
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                  <FileText className="w-3.5 h-3.5" />
                  Technical Analysis
                </div>
              </div>
            </div>
          </Link>
        ))}

        {BOOKMARKS.length === 0 && (
          <div className="md:col-span-2 text-center py-20 glass-panel rounded-[3rem] border border-dashed border-white/10">
            <Bookmark className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No papers bookmarked yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { 
  Lock, 
  FileText, 
  Download, 
  Calendar, 
  User,
  ArrowRight,
  Eye
} from "lucide-react";
import Link from "next/link";

interface PaperCardProps {
  paper: {
    id: string;
    title: string;
    author: string;
    abstract: string;
    category: string;
    tags: string[];
    date: string;
    isPremium: boolean;
  };
  isUserPremium: boolean;
}

export function PaperCard({ paper, isUserPremium }: PaperCardProps) {
  const shouldBlur = paper.isPremium && !isUserPremium;

  return (
    <div className="glass-panel rounded-[2rem] border border-white/5 overflow-hidden group hover:border-primary/30 transition-all flex flex-col h-full">
      {/* Header Info */}
      <div className="p-8 pb-4">
        <div className="flex justify-between items-start mb-6">
          <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black tracking-widest text-primary uppercase">
            {paper.category}
          </div>
          {paper.isPremium && (
            <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              <Lock className="w-3 h-3" />
              Premium
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {paper.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            {paper.author}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {paper.date}
          </div>
        </div>
      </div>

      {/* Abstract Content */}
      <div className="px-8 flex-1 relative">
        <div className={`text-slate-400 text-sm leading-relaxed ${shouldBlur ? 'blur-md select-none' : ''}`}>
          <p className="line-clamp-4">
            {paper.abstract}
          </p>
        </div>

        {shouldBlur && (
          <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/10 backdrop-blur-[2px]">
            <div className="text-center space-y-4">
              <div className="p-3 bg-amber-400/20 rounded-2xl w-fit mx-auto border border-amber-400/30">
                <Lock className="text-amber-400 w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-amber-200 uppercase tracking-[0.2em]">Institutional Access Required</p>
              <Link 
                href="/premium" 
                className="inline-block bg-amber-400 text-amber-950 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Upgrade to Premium
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-8 pt-6 mt-auto border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-2">
          {paper.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] text-slate-600 font-bold">#{tag}</span>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
            <Eye className="w-4 h-4" />
          </button>
          {!shouldBlur && (
            <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              <Download className="w-4 h-4" />
            </button>
          )}
          <Link 
            href={`/research/${paper.id}`}
            className="flex items-center gap-2 text-primary font-bold text-sm ml-2 group/btn"
          >
            Read More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, Tag, Share2 } from "lucide-react";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const article = await prisma.newsArticle.findUnique({
    where: { id }
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white font-jakarta selection:bg-primary/20 pb-32">
      {/* Hero Header */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={article.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000"} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        {/* Navbar Protection Gradient */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10" />
        
        {/* Bottom Info Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
          <div className="max-w-4xl mx-auto space-y-8">
            <Link 
              href="/news" 
              className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Back to News
            </Link>
            
            <div className="space-y-4">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded uppercase tracking-wider">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                {article.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {new Date(article.createdAt).toLocaleDateString("en-US", { 
                  month: "long", 
                  day: "numeric", 
                  year: "numeric" 
                })}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                {article.category}
              </div>
              <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto">
                <Share2 className="w-4 h-4 text-primary" /> Share Mission Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <article className="max-w-3xl mx-auto px-6 mt-20">
        <div className="prose prose-invert prose-primary max-w-none">
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium mb-12 border-l-4 border-primary pl-8 py-2">
            Institutional update regarding {article.category.toLowerCase()} initiatives and mission-critical milestones.
          </p>
          
          <div className="text-slate-400 text-lg leading-[1.8] space-y-8 whitespace-pre-wrap font-jakarta">
            {article.content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-32 pt-12 border-t border-white/10 flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">End of Dispatch</p>
            <p className="text-white text-sm font-bold italic">Official Eka Research Registry</p>
          </div>
          <Link 
            href="/news" 
            className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-primary/50 transition-all"
          >
            Read More Updates
          </Link>
        </div>
      </article>
    </main>
  );
}

import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { BookOpen, FileText, ArrowRight, User } from 'lucide-react';
import { format } from 'date-fns';

export async function PublicationsPreview() {
  const papers = await prisma.researchPaper.findMany({
    where: { status: 'PUBLISHED' },
    take: 4,
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <section className="py-32 bg-[#020617] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-[#BA9F59]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#BA9F59]">Our Library</span>
              </div>
              <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Recent Papers</h2>
           </div>
           <Link href="/research/papers" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2 group">
              See All Papers
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
           {papers.map((paper: any) => (
             <div key={paper.id} className="bg-[#020617] p-10 hover:bg-white/[0.02] transition-all group relative">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span className="text-[#BA9F59]">{paper.category}</span>
                      <span>/</span>
                      <span>{format(paper.createdAt, 'MMM yyyy')}</span>
                   </div>
                   <FileText className="w-5 h-5 text-slate-700 group-hover:text-[#BA9F59] transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight mb-4 min-h-[3rem]">
                   {paper.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8">
                   {paper.abstract}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                         <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{paper.author?.name || 'Researcher'}</span>
                   </div>
                   <Link href={`/research/papers/${paper.id}`} className="text-[9px] font-black uppercase tracking-[0.2em] text-[#BA9F59] opacity-0 group-hover:opacity-100 transition-all">
                      Read Paper
                   </Link>
                </div>
             </div>
           ))}

           {papers.length === 0 && (
             <div className="col-span-full py-32 text-center bg-[#020617]">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Archival synchronization in progress...</p>
             </div>
           )}
        </div>
      </div>
    </section>
  );
}

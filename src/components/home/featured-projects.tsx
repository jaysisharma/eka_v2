import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight, Target, Rocket, FlaskConical } from 'lucide-react';

export async function FeaturedProjects() {
  const projects = await prisma.project.findMany({
    where: { status: { in: ['ONGOING', 'PLANNED'] } },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <section className="py-32 bg-[#020617]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="h-[1px] w-8 bg-[#BA9F59]" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BA9F59]">Our Work</span>
             </div>
             <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Main Projects</h2>
          </div>
          <Link href="/projects" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2 group">
             See All Projects
             <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {projects.map((project: any) => (
             <div key={project.id} className="group flex flex-col bg-white/[0.02] border border-white/5 overflow-hidden transition-all hover:bg-white/[0.04]">
                <div className="aspect-[16/10] overflow-hidden relative">
                   {project.image ? (
                     <img src={project.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                   ) : (
                     <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <Rocket className="w-12 h-12 text-slate-800" />
                     </div>
                   )}
                   <div className="absolute top-4 left-4">
                      <span className="bg-primary/10 backdrop-blur-md border border-primary/20 text-primary text-[8px] font-black px-3 py-1 uppercase tracking-widest">
                         {project.status}
                      </span>
                   </div>
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                   <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight">{project.title}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                     {project.description || "No mission description provided. Analyzing strategic parameters..."}
                   </p>
                   <div className="pt-6 mt-auto border-t border-white/5 flex items-center justify-between">
                      <div className="flex gap-2">
                        {project.tags?.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-[8px] font-bold text-slate-700 uppercase tracking-widest">{tag}</span>
                        ))}
                      </div>
                      <Link href={`/projects/${project.id}`} className="text-white hover:text-primary transition-colors">
                         <ArrowRight className="w-5 h-5" />
                      </Link>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

import prisma from "@/lib/prisma";
import { 
  Rocket, 
  History, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Target,
  CircleDot
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string | null;
  status: any;
  progress: number;
  tags: string[];
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const PAGE_SIZE = 6; // Better for grid

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ current_page?: string; past_page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.current_page) || 1;
  const pastPage = Number(params.past_page) || 1;

  // Fetch Current Projects
  const [currentProjects, currentCount] = await Promise.all([
    prisma.project.findMany({
      where: { status: { in: ["ONGOING", "PLANNED"] } },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.project.count({
      where: { status: { in: ["ONGOING", "PLANNED"] } },
    }),
  ]);

  // Fetch Past Projects
  const [pastProjects, pastCount] = await Promise.all([
    prisma.project.findMany({
      where: { status: { in: ["COMPLETED", "ARCHIVED"] } },
      orderBy: { createdAt: "desc" },
      skip: (pastPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.project.count({
      where: { status: { in: ["COMPLETED", "ARCHIVED"] } },
    }),
  ]);

  const currentTotalPages = Math.ceil(currentCount / PAGE_SIZE);
  const pastTotalPages = Math.ceil(pastCount / PAGE_SIZE);

  return (
    <main className="min-h-screen bg-[#020617] text-white font-jakarta selection:bg-primary selection:text-black pt-32 pb-32">
      
      {/* SECTION: Active Projects - Clean Grid */}
      <section id="active-projects" className="py-20 scroll-mt-32">
        <div className="max-w-[1200px] mx-auto px-6 space-y-12">
          <div className="flex items-center justify-between border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
              <CircleDot className="w-5 h-5 text-emerald-500" />
              <h1 className="text-2xl font-bold tracking-[0.2em] uppercase text-white">Active Projects</h1>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{currentCount} Missions</span>
          </div>

          {currentProjects.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">No active projects</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.map((project: Project) => (
                <div key={project.id} className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-white/[0.04] transition-all">
                   <div className="aspect-video overflow-hidden border-b border-white/5 relative">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
                          <Rocket className="w-10 h-10 text-slate-800" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className={`text-[8px] font-black px-3 py-1 rounded-full text-black uppercase tracking-widest ${
                          project.status === "PLANNED" ? "bg-amber-500" : "bg-emerald-500"
                        }`}>
                           {project.status === "PLANNED" ? "Upcoming" : project.status}
                        </span>
                      </div>
                   </div>

                   <div className="p-8 space-y-6 flex-1 flex flex-col">
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="pt-6 mt-auto border-t border-white/5 flex items-center justify-between">
                         <div className="flex gap-2">
                           {project.tags?.slice(0, 2).map(tag => (
                             <span key={tag} className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{tag}</span>
                           ))}
                         </div>
                         <Link href={`/projects/${project.id}`} className="text-white hover:text-primary transition-all">
                            <ArrowRight className="w-5 h-5" />
                         </Link>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination: Current */}
          {currentTotalPages > 1 && (
            <div className="flex items-center justify-center pt-12">
               <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                  <Link 
                    href={`?current_page=${Math.max(1, currentPage - 1)}&past_page=${pastPage}#active-projects`}
                    scroll={false}
                    className={`p-3 rounded-xl transition-all ${currentPage === 1 ? "text-slate-700 pointer-events-none" : "text-white hover:bg-white/5"}`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Link>
                  <div className="px-6 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Page</span>
                    <span className="text-xs font-bold text-white">{currentPage} / {currentTotalPages}</span>
                  </div>
                  <Link 
                    href={`?current_page=${Math.min(currentTotalPages, currentPage + 1)}&past_page=${pastPage}#active-projects`}
                    scroll={false}
                    className={`p-3 rounded-xl transition-all ${currentPage === currentTotalPages ? "text-slate-700 pointer-events-none" : "text-white hover:bg-white/5"}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION: Past Projects - Technical Archive Grid */}
      <section id="past-projects" className="py-20 border-t border-white/5 scroll-mt-32">
        <div className="max-w-[1200px] mx-auto px-6 space-y-12">
          <div className="flex items-center justify-between border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
              <History className="w-5 h-5 text-slate-500" />
              <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-white/40">Past Projects</h2>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{pastCount} Archival Records</span>
          </div>

          {pastProjects.length === 0 ? (
            <div className="py-20 text-center opacity-50">
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">No past records found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastProjects.map((project: Project) => (
                <div key={project.id} className="group p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all flex flex-col">
                   <div className="aspect-video rounded-xl overflow-hidden border border-white/5 bg-white/5 mb-6">
                      {project.image ? (
                        <img src={project.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                          <Target className="w-8 h-8" />
                        </div>
                      )}
                   </div>
                   <div className="space-y-4 flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">
                          {project.description}
                      </p>
                   </div>
                   <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">Archived</span>
                     <Link href={`/projects/${project.id}`} className="text-slate-500 hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                     </Link>
                   </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination: Past */}
          {pastTotalPages > 1 && (
            <div className="flex items-center justify-center pt-12">
               <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                  <Link 
                    href={`?current_page=${currentPage}&past_page=${Math.max(1, pastPage - 1)}#past-projects`}
                    scroll={false}
                    className={`p-3 rounded-xl transition-all ${pastPage === 1 ? "text-slate-700 pointer-events-none" : "text-white hover:bg-white/5"}`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Link>
                  <div className="px-6 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Page</span>
                    <span className="text-xs font-bold text-white">{pastPage} / {pastTotalPages}</span>
                  </div>
                  <Link 
                    href={`?current_page=${currentPage}&past_page=${Math.min(pastTotalPages, pastPage + 1)}#past-projects`}
                    scroll={false}
                    className={`p-3 rounded-xl transition-all ${pastPage === pastTotalPages ? "text-slate-700 pointer-events-none" : "text-white hover:bg-white/5"}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="py-24 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Eka Aerospace • Mission Registry</p>
        </div>
      </footer>
    </main>
  );
}

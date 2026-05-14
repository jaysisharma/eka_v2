import prisma from "@/lib/prisma";
import { 
  Sparkles, 
  ArrowRight, 
  User,
  Calendar,
  Briefcase
} from "lucide-react";
import Link from "next/link";

export default async function MentorshipsPage() {
  const programs = await prisma.mentorshipProgram.findMany({
    include: {
      mentor: {
        select: { 
          name: true, 
          role: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen bg-[#020617] text-white font-jakarta selection:bg-primary selection:text-black">
      {/* Professional Header */}
      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Professional Development</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Mentorships
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Connect with Eka's leading researchers to accelerate your professional journey in aerospace and deep-tech.
            </p>
          </div>
        </div>
      </section>

      {/* Programs List - Minimalist & Professional */}
      <section className="py-24">
        <div className="max-w-[1000px] mx-auto px-6">
          {programs.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">No active programs found</p>
            </div>
          ) : (
            <div className="space-y-16">
              {programs.map((program: any) => (
                <div key={program.id} className="grid grid-cols-1 md:grid-cols-12 gap-12 group">
                  {/* Left Side: Program Info */}
                  <div className="md:col-span-8 space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{program.title}</h2>
                      <div className="flex items-center gap-6 text-slate-500">
                         <div className="flex items-center gap-2">
                           <Calendar className="w-3.5 h-3.5" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Ongoing Intake</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <Briefcase className="w-3.5 h-3.5" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Institutional Path</span>
                         </div>
                      </div>
                    </div>
                    <p className="text-slate-400 leading-relaxed font-medium text-sm lg:text-base">
                      {program.description}
                    </p>
                  </div>

                  {/* Right Side: Mentor & Action */}
                  <div className="md:col-span-4 space-y-8 md:pt-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{program.mentor.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">{program.mentor.role || "Lead Mentor"}</p>
                      </div>
                    </div>
                    <button className="w-full bg-white text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-3">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Eka Aerospace • Mentorship Registry</p>
        </div>
      </footer>
    </main>
  );
}

import React from "react";
import prisma from "@/lib/prisma";
import { 
  ArrowRight, 
  Globe, 
  Zap, 
  Shield, 
  Database, 
  Microscope,
  Target,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Custom Components
import { GlobalPresenceMap } from "@/components/home/presence-map";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { ObservatoryInitiative } from "@/components/home/observatory-initiative";
import { PublicationsPreview } from "@/components/home/publications-preview";
import { SocialProofSection } from "@/components/home/social-proof";
import { InternationalPartners } from "@/components/home/partners";
import { Footer } from "@/components/layout/footer";

export default async function HomePage() {
  // Fetch Live Statistics
  const [
    projectCount,
    paperCount,
    researcherCount,
    mediaCount
  ] = await Promise.all([
    prisma.project.count({ where: { status: "ONGOING" } }),
    prisma.researchPaper.count({ where: { status: "PUBLISHED" } }),
    prisma.user.count({ where: { role: { in: ["RESEARCHER", "ACADEMIC_PREMIUM", "ADMIN"] } } }),
    prisma.galleryMedia.count()
  ]);

  return (
    <main className="relative min-h-screen flex flex-col bg-[#020617] selection:bg-[#BA9F59] selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/mars-bg.png" 
            alt="Eka Strategic Command" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse-slow_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-radial-at-t from-[#BA9F59]/5 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-2">
               <div className="flex items-center gap-3 animate-fade-in">
                 <div className="h-[1px] w-12 bg-[#BA9F59]/50" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#BA9F59]">Strategic Research Organization</span>
               </div>
               <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase">
                 Space <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BA9F59] via-[#E5C98B] to-[#BA9F59] drop-shadow-[0_0_30px_rgba(186,159,89,0.2)]">
                   Research
                 </span>
               </h1>
            </div>

            <p className="text-slate-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed animate-fade-in delay-200">
              Eka is building the tools we need to live and work in space. We use smart technology to study the stars and help humans move to other planets.
            </p>

            <div className="flex flex-wrap gap-6 pt-6 animate-fade-in delay-300">
              <Link href="/signup" className="group relative px-10 py-5 bg-[#BA9F59] text-[#020617] font-black uppercase tracking-widest text-xs transition-all duration-500 flex items-center gap-4 overflow-hidden">
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">Join Us Today</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/projects" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-500 backdrop-blur-md border-b-2 border-r-2">
                Our Projects
              </Link>
            </div>
          </div>
        </div>


      </section>

      {/* 2. MISSION STATEMENT */}
      <section className="relative py-32 bg-[#020617] border-y border-white/5">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                  <div className="absolute inset-0 border border-[#BA9F59]/20 rounded-full animate-[spin_60s_linear_infinite]" />
                  <div className="absolute inset-4 border border-[#BA9F59]/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" 
                      alt="The Mission"
                      className="w-4/5 h-4/5 object-cover rounded-full grayscale opacity-50"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#BA9F59]/10 rounded-full blur-2xl" />
               </div>

               <div className="space-y-10">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                    <Shield className="w-3.5 h-3.5 text-[#BA9F59]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Our Main Goal</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Making space travel <span className="text-[#BA9F59]">safe and easy for everyone.</span>
                  </h2>
                  <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                    <p>
                      Our goal is to create a place where people can stay and work in space for a long time. By combining science and engineering, we are making it possible for humans to live on other planets sooner.
                    </p>
                    <p className="text-sm font-medium border-l-2 border-[#BA9F59] pl-6 py-2">
                      "We don't just look at the stars; we build the ships to get there." <br />
                      <span className="text-[10px] uppercase tracking-widest font-black text-slate-600 mt-2 block">— Director's Message, 2026</span>
                    </p>
                  </div>
                  <div className="pt-8">
                     <Link href="/about/mission" className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest text-[11px] group">
                       Learn More About Us
                       <ChevronRight className="w-4 h-4 text-[#BA9F59] group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. LIVE RESEARCH STATISTICS */}
      <section className="relative py-24 bg-black/40">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4">
            <StatBlock icon={<Target className="w-5 h-5" />} value={projectCount} label="Active Missions" subtext="Real-time orbital tracking" />
            <StatBlock icon={<Microscope className="w-5 h-5" />} value={paperCount} label="Research Papers" subtext="Peer-reviewed publications" />
            <StatBlock icon={<Globe className="w-5 h-5" />} value={researcherCount} label="Global Personnel" subtext="Certified Eka researchers" />
            <StatBlock icon={<Database className="w-5 h-5" />} value={mediaCount} label="Data Records" subtext="Satellite telemetry logs" />
          </div>
        </div>
      </section>

      {/* 4. GLOBAL PRESENCE MAP */}
      <GlobalPresenceMap />

      {/* 5. FEATURED PROJECTS */}
      <FeaturedProjects />

      {/* 6. UPCOMING EVENTS */}
      <UpcomingEvents />

      {/* 7. OBSERVATORY INITIATIVE */}
      <ObservatoryInitiative />

      {/* 8. PUBLICATIONS PREVIEW */}
      <PublicationsPreview />

      {/* 9. COMMUNITY TESTIMONIALS & 10. MEMBERSHIP CTA */}
      <SocialProofSection />

      {/* 11. INTERNATIONAL PARTNERS */}
      <InternationalPartners />

      {/* 12. FOOTER */}
      <Footer />

    </main>
  );
}

function StatBlock({ icon, value, label, subtext }: { icon: any; value: number; label: string; subtext: string }) {
  return (
    <div className="group space-y-4 p-8 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 bg-[#BA9F59]/10 flex items-center justify-center text-[#BA9F59]">
          {icon}
        </div>
        <div className="h-px w-12 bg-white/10" />
      </div>
      <div className="space-y-1">
        <div className="text-4xl font-black text-white flex items-baseline gap-1">
          {value}
          <span className="text-[#BA9F59] text-sm">+</span>
        </div>
        <div className="text-[11px] font-black uppercase tracking-widest text-white">{label}</div>
        <p className="text-[9px] font-medium uppercase tracking-widest text-slate-600">{subtext}</p>
      </div>
    </div>
  );
}

import React from 'react';
import { Quote, Sparkles, UserPlus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const TESTIMONIALS = [
  {
    quote: "Eka's dataset on LEO-Debris has revolutionized our collision avoidance protocols. The precision is unmatched in the industry.",
    author: "Dr. Sarah Chen",
    role: "Senior Orbital Analyst, Astra Systems"
  },
  {
    quote: "The Observatory Initiative allowed our university to access deep-space telemetry that was previously reserved for national agencies.",
    author: "Prof. Marcus Thorne",
    role: "Department Head, Lunar Studies Institute"
  }
];

export function SocialProofSection() {
  return (
    <div className="bg-[#020617]">
      {/* TESTIMONIALS */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             {TESTIMONIALS.map((t, i) => (
               <div key={i} className="relative space-y-8 p-12 bg-white/[0.01] border border-white/5 rounded-3xl">
                  <Quote className="w-10 h-10 text-[#BA9F59] opacity-20 absolute top-8 right-8" />
                  <p className="text-2xl font-medium text-slate-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#BA9F59] to-transparent opacity-50" />
                     <div>
                        <div className="text-sm font-black text-white uppercase tracking-widest">{t.author}</div>
                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{t.role}</div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP CTA */}
      <section className="py-40 relative overflow-hidden">
         <div className="absolute inset-0 bg-[#BA9F59] opacity-[0.03]" />
         <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10 space-y-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <Sparkles className="w-4 h-4 text-[#BA9F59]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#BA9F59]">Join the Team</span>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                Join the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BA9F59] to-[#E5C98B]">Eka Family</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                Get full access to all our space data, research papers, and help us plan our next big mission.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
               <Link href="/signup" className="w-full sm:w-auto px-12 py-5 bg-[#BA9F59] text-[#020617] font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all flex items-center justify-center gap-3">
                 <UserPlus className="w-4 h-4" />
                 Sign Up Now
               </Link>
               <Link href="/about/membership" className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all">
                 See Plans
               </Link>
            </div>

            <div className="pt-12 flex items-center justify-center gap-12 grayscale opacity-30">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">TRUSTED GLOBALLY</span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">SECURE SYSTEM</span>
            </div>
         </div>
      </section>
    </div>
  );
}

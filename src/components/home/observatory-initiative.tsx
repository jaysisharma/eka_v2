import React from 'react';
import { Telescope, Radio, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ObservatoryInitiative() {
  return (
    <section className="relative py-32 bg-[#020617] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-[#BA9F59]/20 to-transparent" />
        <img 
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000" 
          alt="" 
          className="w-full h-full object-cover grayscale" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="max-w-2xl space-y-10">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Telescope className="w-5 h-5 text-[#BA9F59]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#BA9F59]">Look at the Stars</span>
              </div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                The Space <br />
                <span className="text-[#BA9F59]">Watch</span>
              </h2>
           </div>

           <p className="text-slate-400 text-lg leading-relaxed font-medium">
             Eka lets you use our telescopes and satellite cameras. You can watch the stars in real-time and help us learn more about our universe.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="p-6 bg-white/5 border border-white/10 space-y-3">
                 <Radio className="w-6 h-6 text-[#BA9F59]" />
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Live Feed</h4>
                 <p className="text-[10px] text-slate-500 leading-relaxed">Watch live video directly from our space station.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 space-y-3">
                 <Shield className="w-6 h-6 text-[#BA9F59]" />
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Share What You See</h4>
                 <p className="text-[10px] text-slate-500 leading-relaxed">Send us your space photos and we will help you identify them.</p>
              </div>
           </div>

           <div className="pt-8">
             <Link href="/observatory" className="group px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-[#BA9F59] transition-all flex items-center gap-4 w-fit">
               Access Observatory Feed
               <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </Link>
           </div>
        </div>
      </div>

      {/* Decorative HUD Element */}
      <div className="absolute bottom-20 right-20 hidden lg:block opacity-30">
         <div className="relative w-64 h-64">
            <div className="absolute inset-0 border border-[#BA9F59] rounded-full animate-ping" />
            <div className="absolute inset-8 border border-white/20 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-[8px] font-black text-[#BA9F59] uppercase tracking-[0.3em]">Tracking...</span>
            </div>
         </div>
      </div>
    </section>
  );
}

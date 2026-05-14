import React from 'react';

const PARTNERS = [
  'NASA', 'ESA', 'ISRO', 'JAXA', 'CSA', 'ROSCOSMOS'
];

export function InternationalPartners() {
  return (
    <section className="py-24 bg-[#020617] border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-12">
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-700">Organizations We Work With</span>
          
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 grayscale opacity-20 hover:opacity-50 transition-opacity">
            {PARTNERS.map(partner => (
              <span key={partner} className="text-3xl md:text-5xl font-black text-white tracking-tighter transition-all hover:text-[#BA9F59] hover:scale-105 cursor-default">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

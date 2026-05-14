import React from 'react';
import Link from 'next/link';
import { Mail, Code, Globe, Briefcase, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-32 pb-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-[#BA9F59] flex items-center justify-center">
                  <span className="text-black font-black text-xs">E</span>
               </div>
               <span className="text-xl font-black tracking-tighter text-white uppercase">
                 Eka <span className="text-[#BA9F59]">Research</span>
               </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              We build tools and technology to help humans explore space and live on other planets. Started in 2024.
            </p>
            <div className="flex items-center gap-4">
               <SocialLink href="#" icon={<Globe className="w-4 h-4" />} />
               <SocialLink href="#" icon={<Code className="w-4 h-4" />} />
               <SocialLink href="#" icon={<Briefcase className="w-4 h-4" />} />
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-8">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">What We Do</h4>
             <ul className="space-y-4">
                <FooterLink href="/research" label="Our Research" />
                <FooterLink href="/projects" label="Active Projects" />
                <FooterLink href="/store" label="Our Store" />
                <FooterLink href="/opportunities" label="Work With Us" />
             </ul>
          </div>

          {/* Resources */}
          <div className="space-y-8">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">About Us</h4>
             <ul className="space-y-4">
                <FooterLink href="/about/mission" label="Our Mission" />
                <FooterLink href="/about/team" label="The Team" />
                <FooterLink href="/about/contact" label="Contact Us" />
                <FooterLink href="/login" label="Log In" />
             </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Main Office</h4>
             <ul className="space-y-6">
                <li className="flex items-start gap-3">
                   <MapPin className="w-4 h-4 text-[#BA9F59] shrink-0 mt-1" />
                   <div className="text-sm text-slate-500 leading-relaxed">
                      Eka Main Office <br />
                      Hennur Main Rd, Bangalore <br />
                      Karnataka 560043, India
                   </div>
                </li>
                <li className="flex items-center gap-3">
                   <Mail className="w-4 h-4 text-[#BA9F59]" />
                   <span className="text-sm text-slate-500 font-medium">help@ekaresearch.org</span>
                </li>
             </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">
             © 2026 Eka Research Organization. All telemetry protocols reserved.
           </p>
           <div className="flex items-center gap-8">
              <Link href="/privacy" className="text-[9px] font-bold text-slate-700 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-[9px] font-bold text-slate-700 uppercase tracking-widest hover:text-white transition-colors">Operational Terms</Link>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Network Operational</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-slate-500 hover:text-white hover:pl-2 transition-all duration-300 font-medium">
        {label}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a href={href} className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-[#BA9F59] hover:border-[#BA9F59]/50 transition-all">
      {icon}
    </a>
  );
}

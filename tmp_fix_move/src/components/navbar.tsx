"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Search, Menu, X, Activity } from "lucide-react";
import { EkaLogo } from "./ui/logo";
import { NotificationBell } from "./notifications/notification-bell";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b ${
      scrolled 
      ? "bg-[#020617]/90 backdrop-blur-xl border-white/5 py-3" 
      : "bg-transparent border-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Architecture */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <EkaLogo className="w-10 h-10 transition-transform duration-700 group-hover:rotate-[360deg]" />
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col -space-y-1.5">
            <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">Eka</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[7px] font-black tracking-[0.4em] text-slate-500 uppercase">Aerospace</span>
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        </Link>
        
        {/* Logical Sector Navigation */}
        <div className="hidden lg:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
          <NavSector 
            label="Research" 
            items={[
              { label: "Technical Archive", href: "/research", desc: "Scientific papers & mission data" },
              { label: "Institutional Personnel", href: "/researchers", desc: "Our global scientist network" },
              { label: "Active Missions", href: "/projects", desc: "Current aerospace projects" },
            ]} 
          />
          <NavSector 
            label="Dispatches" 
            items={[
              { label: "Mission News", href: "/news", desc: "Official organizational updates" },
              { label: "Event Calendar", href: "/events", desc: "Symposiums & workshops" },
              { label: "Media Vault", href: "/gallery", desc: "Visual assets & telemetry" },
            ]} 
          />
          <NavSector 
            label="Careers" 
            items={[
              { label: "Mission Openings", href: "/opportunities", desc: "Join our global workforce" },
              { label: "Academic Mentorship", href: "/mentorship", desc: "Next-gen researcher programs" },
            ]} 
          />
          <div className="w-px h-4 bg-white/10 mx-2" />
          <Link href="/store" className="px-3 py-2 hover:text-primary transition-colors">Store</Link>
          <Link href="/about" className="px-3 py-2 hover:text-primary transition-colors">About</Link>
        </div>

        {/* Tactical Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 pr-4 border-r border-white/5">
            <NotificationBell />
            <Link href="/search" className="p-2 hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-primary">
              <Search className="w-4 h-4" />
            </Link>
          </div>

          <Link 
            href="/login" 
            className="group relative px-6 py-2.5 bg-white/5 hover:bg-primary transition-all rounded-xl overflow-hidden border border-white/10 hover:border-primary"
          >
            <div className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:text-primary-foreground transition-colors">
              <Activity className="w-3.5 h-3.5" />
              Command Center
            </div>
          </Link>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Terminal Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-[#020617] z-[90] p-8 flex flex-col gap-8 animate-in fade-in duration-300 overflow-y-auto">
          <div className="space-y-8">
            <MobileSector label="Research" items={["Archive", "Personnel", "Missions"]} />
            <MobileSector label="Updates" items={["News", "Events", "Gallery"]} />
            <MobileSector label="Recruitment" items={["Jobs", "Mentorship"]} />
          </div>
          <div className="pt-8 border-t border-white/5 space-y-4">
            <Link href="/store" className="block text-lg font-black text-white uppercase tracking-widest">Store</Link>
            <Link href="/about" className="block text-lg font-black text-white uppercase tracking-widest">About</Link>
          </div>
          <Link href="/login" className="mt-auto w-full bg-primary text-primary-foreground py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-center shadow-2xl shadow-primary/20">
            Start Mission Access
          </Link>
        </div>
      )}
    </nav>
  );
}

function NavSector({ label, items }: { label: string; items: { label: string; href: string, desc: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className={`flex items-center gap-1.5 px-3 py-2 transition-all cursor-pointer outline-none ${isOpen ? "text-primary" : "hover:text-white"}`}>
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 pt-4 w-72 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="glass-panel rounded-3xl border border-white/5 bg-[#020617]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {items.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="group flex flex-col p-4 rounded-2xl hover:bg-white/5 transition-all"
              >
                <div className="text-[10px] font-black text-white group-hover:text-primary transition-colors tracking-widest uppercase mb-1">
                  {item.label}
                </div>
                <div className="text-[9px] text-slate-500 font-medium leading-relaxed group-hover:text-slate-400">
                  {item.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileSector({ label, items }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{label}</h3>
      <div className="grid grid-cols-1 gap-4 pl-4 border-l border-white/5">
        {items.map((item: string) => (
          <Link key={item} href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{item}</Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Rocket, ShieldCheck, Globe, Database, Microscope } from "lucide-react";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  slogan?: string;
  visualType?: "login" | "signup";
}

export function AuthWrapper({ children, title, subtitle, slogan, visualType = "login" }: AuthWrapperProps) {
  return (
    <div className="min-h-screen w-full flex bg-[#020617] text-white overflow-hidden">
      {/* Left Side: Space Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-end items-start p-12 border-r border-white/5">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/mars-bg.png" 
            alt="Mars Research Outpost" 
            className="w-full h-full object-cover opacity-60 scale-110 animate-[pulse-slow_30s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent opacity-80" />
        </div>

        {/* Logo at Top Left */}
        <div className="absolute top-12 left-12 z-20 flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-[#BA9F59] shadow-[4px_4px_0_0_rgba(186,159,89,0.2)]">
            <Rocket className="text-[#020617] w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Eka Research</span>
        </div>

        {/* Content Overlay - Bottom Left */}
        <div className="relative z-10 max-w-lg mb-8">
          <h2 className="text-5xl font-black tracking-tighter leading-tight mb-4">
            {slogan || (visualType === "login" ? "Welcome back." : "Start research.")}
          </h2>
          
          <p className="text-[#94a3b8] text-lg font-medium leading-relaxed max-w-xl">
            {visualType === "login" 
              ? <>Secure access to the EKA ecosystem.<br />Contribute to the global mission and<br />build the future of orbital science.</>
              : "Join the global network of aerospace engineers."}
          </p>

          {visualType === "signup" && (
            <div className="flex gap-12 pt-8 mt-8 border-t border-white/10">
              <div className="space-y-1">
                <span className="text-2xl font-bold text-white">85+</span>
                <p className="text-[10px] uppercase tracking-widest text-[#94a3b8]">Partners</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold text-white">1.2k</span>
                <p className="text-[10px] uppercase tracking-widest text-[#94a3b8]">Researchers</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#BA9F59]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-3">{title}</h1>
            <p className="text-[#94a3b8] font-medium">{subtitle}</p>
          </div>

          <div className="glass-panel p-8 md:p-10 border border-white/5 shadow-2xl">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}

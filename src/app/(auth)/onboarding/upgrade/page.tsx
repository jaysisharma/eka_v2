"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function UpgradePage() {
  return (
    <AuthWrapper
      title="Access Premium Intelligence"
      subtitle="Unlock advanced research datasets, priority computing, and collaborative research clusters."
      visualType="login"
    >
      <div className="w-full space-y-8">
        <div className="space-y-4">
          <div className="p-4 bg-[#BA9F59]/10 border border-[#BA9F59]/30 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#BA9F59] shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-white uppercase tracking-widest mb-1">Eka Research Pro</p>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Full access to the planetary intelligence network and deep-space research repositories.
              </p>
            </div>
          </div>
          
          <ul className="space-y-3 px-2">
            {["Real-time telemetry feeds", "AI-powered data synthesis", "Unlimited cluster storage"].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-[#BA9F59]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 pt-2">
          <Link 
            href="/payment"
            className="w-full bg-[#BA9F59] text-[#020617] py-4 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[4px_4px_0_0_rgba(186,159,89,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Upgrade to Pro <Sparkles className="w-4 h-4" />
          </Link>
          
          <Link 
            href="/portal/dashboard"
            className="w-full text-slate-500 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:text-white transition-colors"
          >
            Skip for now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

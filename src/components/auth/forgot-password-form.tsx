"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending reset link
    setTimeout(() => {
      setIsSent(true);
      setIsLoading(false);
    }, 1500);
  };

  if (isSent) {
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#BA9F59]/10 flex items-center justify-center text-[#BA9F59]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Transmission Sent</h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            A recovery protocol has been dispatched to <br />
            <span className="text-white font-bold">{email}</span>. <br />
            Please verify your terminal.
          </p>
        </div>
        <Link 
          href="/login"
          className="w-full bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all block"
        >
          Return to Portal
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8] ml-1">
          Recovery Email
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#BA9F59] transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <input 
            type="email" 
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#BA9F59]/50 focus:ring-1 focus:ring-[#BA9F59]/50 transition-all text-white placeholder:text-slate-600 text-sm font-medium"
          />
        </div>
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#BA9F59] text-[#020617] py-3.5 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Dispatch Protocol <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="text-center">
        <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] hover:text-[#BA9F59] transition-colors">
          Back to Identity Access
        </Link>
      </div>
    </form>
  );
}

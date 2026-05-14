"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Loader2, ArrowRight } from "lucide-react";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Credentials do not match");
      return;
    }
    setIsLoading(true);
    setError("");
    
    // Simulate reset
    setTimeout(() => {
      window.location.href = "/login";
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8] ml-1">
            New Password
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#BA9F59] transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#BA9F59]/50 focus:ring-1 focus:ring-[#BA9F59]/50 transition-all text-white placeholder:text-slate-600 text-sm font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8] ml-1">
            Confirm New Password
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#BA9F59] transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#BA9F59]/50 focus:ring-1 focus:ring-[#BA9F59]/50 transition-all text-white placeholder:text-slate-600 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">{error}</p>}

      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#BA9F59] text-[#020617] py-3.5 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Apply New Credentials <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

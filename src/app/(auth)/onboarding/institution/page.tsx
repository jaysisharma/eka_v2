"use client";

import { useState } from "react";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Building2, ArrowRight, Loader2 } from "lucide-react";
import { updateInstitution } from "@/server/actions/onboarding";

export default function InstitutionPage() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await updateInstitution(name);
    if (result.success) {
      window.location.href = "/onboarding/upgrade";
    } else {
      alert("Failed to save institution details. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper
      title="Research Institution"
      subtitle="Identify your primary academic or commercial research affiliation."
      visualType="signup"
    >
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">
            Institution Name
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#BA9F59] transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              placeholder="e.g. Stanford University"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#BA9F59]/50 transition-all text-white placeholder:text-slate-600 text-sm rounded-none"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading || !name}
          className="w-full cursor-pointer bg-[#BA9F59] text-[#020617] py-3.5 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 rounded-none shadow-[4px_4px_0_0_rgba(186,159,89,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Confirm Institution <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </AuthWrapper>
  );
}

"use client";

import { useState } from "react";
import { 
  Briefcase, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  ArrowLeft,
  ShieldCheck,
  Building2,
  Info
} from "lucide-react";
import Link from "next/link";

export default function ApplyToOpportunity({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1000);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
        <div className="glass-panel p-12 rounded-[3rem] border border-white/10 text-center max-w-md animate-fade-in">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-[2rem] mx-auto mb-8 flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Application Transmitted</h1>
          <p className="text-slate-400 leading-relaxed mb-8">
            Your credentials and research portfolio have been successfully transmitted to the Eka Recruitment Division. You will receive a notification via your institutional email.
          </p>
          <Link 
            href="/opportunities" 
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all glow-border"
          >
            Back to Archive
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto relative z-10">
        <Link 
          href="/opportunities" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Opportunity
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-white uppercase tracking-tight">Mission Application</h1>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Opportunity ID: #EK-{params.id}</p>
                </div>
              </div>
            </header>

            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Cover Letter / Research Motivation</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <textarea 
                    rows={6}
                    placeholder="Describe why you are the ideal candidate for this mission..."
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-primary/50 transition-all text-white resize-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Upload CV & Portfolio</label>
                <div className="border-2 border-dashed border-white/5 hover:border-primary/30 transition-all rounded-[2rem] p-12 text-center group cursor-pointer bg-white/5">
                  <Upload className="w-10 h-10 text-slate-600 group-hover:text-primary transition-colors mx-auto mb-4" />
                  <div className="text-sm font-bold text-white mb-1">Drag and drop your files</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">PDF, DOCX up to 10MB</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                <Info className="w-5 h-5 text-primary shrink-0" />
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                  By clicking submit, you authorize Eka Aerospace to review your academic credentials and verified research history associated with this account.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 glow-border flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Transmit Application"}
              </button>
            </form>
          </div>

          {/* Sidebar: Role Benefits */}
          <div className="lg:col-span-1 space-y-8 pt-20">
            <div className="glass-panel p-8 rounded-[2rem] border border-white/5 space-y-6">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Eligibility
              </h3>
              <div className="space-y-4">
                <EligibilityItem label="Academic Verification" status="Verified" />
                <EligibilityItem label="Security Clearance" status="L1 General" />
                <EligibilityItem label="Researcher Status" status="Eligible" />
              </div>
            </div>

            <div className="glass-panel p-8 rounded-[2rem] border border-white/5 space-y-6">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Division
              </h3>
              <div className="text-slate-400 text-sm leading-relaxed">
                Propulsion & Orbital Mechanics Division<br />
                <span className="text-slate-600 text-xs mt-2 block">Headquarters: Oslo, Norway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function EligibilityItem({ label, status }: any) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="text-emerald-400 font-black uppercase tracking-tighter">{status}</span>
    </div>
  );
}

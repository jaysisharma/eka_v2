"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  School, 
  Mail, 
  FileUp, 
  Loader2, 
  ArrowRight, 
  Info,
  CheckCircle2
} from "lucide-react";

export default function AcademicVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="glass-panel p-12 rounded-[3rem] border border-white/5 max-w-xl text-center animate-fade-in">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-emerald-400 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tight">Transmission Received</h2>
          <p className="text-slate-400 leading-relaxed mb-10">
            Your academic verification request has been submitted to the Eka Administrative Board. 
            Manual review typically takes <span className="text-white font-bold">48-72 hours</span>. 
            You will receive a notification at your institutional email.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform glow-border uppercase text-xs tracking-widest">
            Back to Portal
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3 h-3" />
            Institutional Verification
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase">
            Request <span className="text-primary glow-text">Academic Premium</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Eka provides free premium access to verified researchers and students from recognized educational and space research institutions.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Information Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Process Details
              </h3>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  Manual review by Eka Administrative Board.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  Full access to research papers and datasets.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  Renewable every academic year.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl border border-amber-500/10 bg-amber-500/5 text-amber-500/80 text-xs leading-relaxed italic">
              Note: Providing false institutional details will result in permanent suspension of your Eka identity.
            </div>
          </div>

          {/* Form Side */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Institution Name</label>
                <div className="relative group">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="e.g. Massachusetts Institute of Technology"
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Institutional Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    placeholder="name@institution.edu"
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Verification Note</label>
                <textarea 
                  placeholder="Describe your research focus or academic intent..."
                  required
                  rows={4}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-700 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Proof of Affiliation (Optional)</label>
                <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center hover:border-primary/30 transition-all cursor-pointer group">
                  <FileUp className="w-8 h-8 text-slate-600 mx-auto mb-4 group-hover:text-primary transition-colors" />
                  <p className="text-xs text-slate-500 font-medium">Click to upload ID card or enrollment proof (PDF/JPG)</p>
                  <p className="text-[9px] text-slate-600 mt-1 uppercase font-bold tracking-widest">Max file size: 5MB</p>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 glow-border uppercase text-xs tracking-[0.2em]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Submit Application <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

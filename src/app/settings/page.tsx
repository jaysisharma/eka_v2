"use client";

import { useState } from "react";
import { 
  User, 
  Mail, 
  FileText, 
  Globe, 
  Camera, 
  ShieldCheck, 
  Loader2,
  CheckCircle2,
  Tags,
  Lock,
  Bell,
  Fingerprint
} from "lucide-react";

export default function UserSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Personnel Settings</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage institutional identity, security protocols, and preferences</p>
        </header>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Navigation/Profile Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <div className="w-24 h-24 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-slate-100 relative group overflow-hidden shadow-inner">
                <User className="w-10 h-10 text-slate-300" />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Jaysi Sharma</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Research Candidate</p>
              
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Academic
              </div>
            </div>

            <nav className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <SettingsNavButton active icon={<User className="w-4 h-4" />} label="Profile Information" />
              <SettingsNavButton icon={<Lock className="w-4 h-4" />} label="Security & Access" />
              <SettingsNavButton icon={<Bell className="w-4 h-4" />} label="Notifications" />
              <SettingsNavButton icon={<Fingerprint className="w-4 h-4" />} label="Digital Identity" />
            </nav>
          </div>

          {/* Form Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      type="text" 
                      defaultValue="Jaysi Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm text-slate-700 font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Institutional Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="email" 
                      defaultValue="j.sharma@institution.edu"
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 rounded-md py-2.5 pl-11 pr-4 text-slate-400 cursor-not-allowed text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Professional Biography</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                  <textarea 
                    rows={4}
                    placeholder="Describe your research focus..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-md py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm text-slate-700 font-medium resize-none"
                    defaultValue="Graduate researcher focused on orbital mechanics and autonomous docking protocols for interplanetary logistics."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Research Interests</label>
                <div className="relative group">
                  <Tags className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="e.g. Propulsion, Astrobiology, Robotics"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm text-slate-700 font-medium"
                    defaultValue="Propulsion, Orbital Mechanics, AI"
                  />
                </div>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-1 ml-1">Separate interests with commas</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              {isSaved && (
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Settings Updated
                </div>
              )}
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-[#0B1120] text-white px-8 py-3 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-slate-200 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function SettingsNavButton({ icon, label, active }: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-l-2 ${
      active 
        ? "bg-slate-50 text-emerald-600 border-emerald-500" 
        : "text-slate-400 border-transparent hover:bg-slate-50 hover:text-slate-600"
    }`}>
      {icon}
      {label}
    </button>
  );
}

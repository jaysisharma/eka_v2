"use client";

import { useState } from "react";
import { 
  User, 
  Mail, 
  FileText, 
  Camera, 
  ShieldCheck, 
  Loader2,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  KeyRound
} from "lucide-react";
import { updateProfile, updatePassword } from "./actions";

export default function AdminSettings({ initialUser }: { initialUser: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: initialUser?.name || "",
    bio: initialUser?.bio || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordError("");
    
    try {
      // Profile update
      const profileResult = await updateProfile({
        name: formData.name,
        bio: formData.bio,
      });

      // Password update if fields are filled
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setPasswordError("Passwords do not match");
          setIsLoading(false);
          return;
        }
        
        const passwordResult = await updatePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        });

        if (!passwordResult.success) {
          setPasswordError(passwordResult.error || "Password update failed");
          setIsLoading(false);
          return;
        }
      }
      
      if (profileResult.success) {
        setIsSaved(true);
        setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to update settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${initialUser?.id || 'admin'}&backgroundColor=f8fafc`;

  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Settings</h1>
        <p className="text-slate-400 text-sm font-medium mt-1">Manage administrative identity and system access protocols</p>
      </header>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Identity Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
            <div className="w-24 h-24 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-slate-100 relative group overflow-hidden shadow-sm">
              <img 
                src={initialUser?.image || defaultAvatar} 
                alt="" 
                className="w-full h-full object-cover rounded-2xl" 
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">{formData.name || "Admin Account"}</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">{initialUser?.role || "Institutional Controller"}</p>
            
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 text-[10px] font-bold uppercase tracking-widest shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Account
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Identity Section */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
              <User className="w-4 h-4 text-emerald-500" />
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Administrative Identity</h4>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    defaultValue={initialUser?.email || ""}
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-md py-2.5 pl-11 pr-4 text-slate-400 cursor-not-allowed text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Bio / Designation</label>
              <div className="relative group">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                <textarea 
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm text-slate-700 font-medium resize-none"
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Access Security</h4>
              </div>
              <button 
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="text-[10px] font-bold text-slate-400 hover:text-emerald-500 transition-colors uppercase tracking-widest flex items-center gap-2"
              >
                {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPasswords ? "Hide" : "Show"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    type={showPasswords ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-amber-500 transition-all text-sm text-slate-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                <input 
                  type={showPasswords ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-md py-2.5 px-4 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm text-slate-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                <input 
                  type={showPasswords ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md py-2.5 px-4 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm text-slate-700"
                />
              </div>
            </div>

            {passwordError && (
              <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest bg-rose-50 p-3 rounded-md border border-rose-100">
                {passwordError}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-4">
            {isSaved && (
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Settings Synchronized
              </div>
            )}
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-[#0B1120] text-white px-10 py-3.5 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-slate-200 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Commit Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

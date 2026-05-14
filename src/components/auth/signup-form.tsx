"use client";

import { useState } from "react";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { sendOtp } from "@/server/actions/auth";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const result = await sendOtp(formData.email);
      
      if (result.success) {
        // Pass data to verify-otp page via query params
        const params = new URLSearchParams({
          email: formData.email,
          name: formData.fullName,
          password: formData.password,
          flow: "signup" // Indicate this is a signup flow
        });
        router.push(`/verify-otp?${params.toString()}`);
      } else {
        setError(result.error || "Failed to initialize account creation.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#BA9F59] transition-colors">
              <User className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              placeholder="Researcher Name"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full bg-white/5 border border-white/10 py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#BA9F59]/50 transition-all text-white placeholder:text-slate-600 text-sm rounded-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">
            Email
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#BA9F59] transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input 
              type="email" 
              placeholder="name@institution.edu"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#BA9F59]/50 transition-all text-white placeholder:text-slate-600 text-sm rounded-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">
            Access Password
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#BA9F59] transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-white/5 border border-white/10 py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#BA9F59]/50 transition-all text-white placeholder:text-slate-600 text-sm rounded-none"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest bg-red-500/10 py-2 border border-red-500/20">
            {error}
          </div>
        )}

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer bg-[#BA9F59] text-[#020617] py-3.5 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 rounded-none shadow-[4px_4px_0_0_rgba(186,159,89,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Create Account <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-[#94a3b8]">
          Already have an account?{" "}
          <a href="/login" className="text-[#BA9F59] font-bold ml-1 hover:text-white transition-colors cursor-pointer">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

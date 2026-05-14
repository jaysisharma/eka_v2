"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Direct login with email and password
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/portal/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/portal/dashboard" });
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">
            Institutional Email
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#BA9F59] transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="name@institution.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#BA9F59]/50 transition-all text-white placeholder:text-slate-600 text-sm rounded-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">
            Security Password
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
              Sign In <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
          <span className="bg-[#0f172a] px-4 text-[#94a3b8]">Or</span>
        </div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-white/5 border border-white/10 text-white py-3.5 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-white/10 transition-all rounded-none cursor-pointer"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 grayscale opacity-70" />
        Continue with Google
      </button>

      <div className="pt-4 text-center">
        <p className="text-xs text-[#94a3b8]">
          No account?{" "}
          <a 
            href="/signup" 
            className="text-[#BA9F59] font-bold ml-1 hover:text-white transition-colors cursor-pointer"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

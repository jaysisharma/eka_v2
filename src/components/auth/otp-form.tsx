"use client";

import { useState, useRef, Suspense } from "react";
import { Loader2, ArrowRight, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function OtpFormContent() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  
  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";
  const password = searchParams.get("password") || "";
  const isSignup = searchParams.get("flow") === "signup";

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otp.some(d => d === "")) return;
    
    setIsLoading(true);
    setError("");
    const code = otp.join("");

    try {
      const result = await signIn("otp", {
        email,
        code,
        name,
        password,
        redirect: false, // Don't redirect automatically
      });

      if (result?.error) {
        setError("Invalid or expired verification code.");
        setIsLoading(false);
      } else {
        // If signup flow, go to institution onboarding
        if (isSignup) {
          window.location.href = "/onboarding/institution";
        } else {
          window.location.href = "/portal/dashboard";
        }
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 bg-white/5 border border-white/10 text-center text-xl font-bold text-white focus:outline-none focus:border-[#BA9F59] transition-all rounded-none"
          />
        ))}
      </div>

      <div className="space-y-4">
        {error && (
          <div className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest bg-red-500/10 py-2 border border-red-500/20">
            {error}
          </div>
        )}

        <button 
          onClick={() => handleSubmit()}
          disabled={isLoading || otp.some(d => d === "")}
          className="w-full cursor-pointer bg-[#BA9F59] text-[#020617] py-3.5 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-30 rounded-none shadow-[4px_4px_0_0_rgba(186,159,89,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Verify Identity <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex flex-col gap-3 items-center">
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#BA9F59] hover:text-white transition-colors cursor-pointer">
            Resend Code
          </button>
          <a href="/login" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8] hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
            <Mail className="w-3 h-3" /> Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export function OtpForm() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-[#BA9F59]" /></div>}>
      <OtpFormContent />
    </Suspense>
  );
}

"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { CreditCard, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useState, Suspense } from "react";
import { upgradeToPremium } from "@/server/actions/onboarding";

function PaymentPageContent() {
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");

  const handlePayment = async (success: boolean) => {
    setStatus("processing");
    
    // Simulate gateway delay
    setTimeout(async () => {
      if (success) {
        const result = await upgradeToPremium();
        if (result.success) {
          setStatus("success");
          setTimeout(() => {
            window.location.href = "/portal/dashboard";
          }, 1500);
        } else {
          setStatus("failed");
        }
      } else {
        setStatus("failed");
        setTimeout(() => {
          // Redirect to dashboard with a failed flag to show the sidebar widget
          window.location.href = "/portal/dashboard?payment=failed";
        }, 1500);
      }
    }, 2000);
  };

  return (
    <AuthWrapper
      title="Secure Terminal"
      subtitle="Complete your institutional subscription to unlock Pro intelligence."
      visualType="login"
    >
      <div className="w-full space-y-8">
        {status === "idle" && (
          <div className="space-y-6">
            <div className="p-6 bg-white/5 border border-white/10 space-y-4">
              <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
                <span>Monthly Access</span>
                <span className="text-white">$49.00</span>
              </div>
              <div className="h-[1px] bg-white/10" />
              <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-[#BA9F59]">
                <span>Total Amount</span>
                <span>$49.00</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => handlePayment(true)}
                className="w-full bg-[#BA9F59] text-[#020617] py-4 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[4px_4px_0_0_rgba(186,159,89,0.2)] cursor-pointer"
              >
                Complete Payment <CreditCard className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => handlePayment(false)}
                className="w-full text-slate-500 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:text-red-400 transition-colors cursor-pointer"
              >
                Simulate Payment Failure
              </button>
            </div>
          </div>
        )}

        {status === "processing" && (
          <div className="py-12 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#BA9F59]" />
            <p className="text-[10px] font-bold text-[#BA9F59] uppercase tracking-[0.3em]">Processing Transaction</p>
          </div>
        )}

        {status === "success" && (
          <div className="py-12 flex flex-col items-center gap-4 animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <p className="text-[10px] font-bold text-green-500 uppercase tracking-[0.3em]">Transaction Secured</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Redirecting to Dashboard...</p>
          </div>
        )}

        {status === "failed" && (
          <div className="py-12 flex flex-col items-center gap-4 animate-shake">
            <XCircle className="w-12 h-12 text-red-500" />
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em]">Transaction Declined</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Returning to Dashboard...</p>
          </div>
        )}
      </div>
    </AuthWrapper>
  );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPageContent />
        </Suspense>
    )
}

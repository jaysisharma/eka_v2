"use client";

import { Check, X, ExternalLink } from "lucide-react";
import { updateVerificationStatus } from "./actions";
import { useState } from "react";

export function VerificationRow({ user }: { user: any }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
    setIsProcessing(true);
    await updateVerificationStatus(user.id, status);
    setIsProcessing(false);
  };

  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white uppercase tracking-tight">{user.name || "Unnamed User"}</span>
          <span className="text-[10px] text-slate-500 lowercase">{user.email}</span>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="text-xs text-white font-medium">{user.institutionDetails || "No details provided"}</span>
          <span className="text-[9px] text-[#BA9F59] font-bold uppercase tracking-widest">{user.institutionalEmail || "No institutional email"}</span>
        </div>
      </td>
      <td className="px-6 py-5">
        {user.proofUrl ? (
          <a 
            href={user.proofUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors"
          >
            View Document <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">No Document</span>
        )}
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => handleStatusUpdate("APPROVED")}
            disabled={isProcessing}
            className="p-2 border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50 rounded-none"
            title="Approve"
          >
            <Check className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleStatusUpdate("REJECTED")}
            disabled={isProcessing}
            className="p-2 border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 rounded-none"
            title="Reject"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

"use client";

import { Check, X, ExternalLink, Mail, Building, Clock, MapPin, ShieldCheck, AlertCircle } from "lucide-react";
import { updateVerificationStatus } from "./actions";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function VerificationCard({ candidate }: { candidate: any }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmApprove, setShowConfirmApprove] = useState(false);
  const [showConfirmReject, setShowConfirmReject] = useState(false);

  const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
    setIsProcessing(true);
    await updateVerificationStatus(candidate.id, status);
    setIsProcessing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-amber-50 text-amber-600 border-amber-100";
      case "APPROVED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "REJECTED": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="space-y-6">
        {/* Header: Identity */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.email}`} 
              alt={candidate.name || "User"} 
              className="w-12 h-12 rounded-md bg-slate-50 border border-slate-100 object-cover"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-800 leading-tight">{candidate.name || "Unnamed"}</h3>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mt-1">
                <Mail className="w-3 h-3" />
                {candidate.email}
              </div>
            </div>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border shadow-sm ${getStatusBadge(candidate.academicStatus)}`}>
            {candidate.academicStatus}
          </span>
        </div>

        {/* Dossier Content */}
        <div className="space-y-4 py-4 border-y border-slate-50">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-50 rounded-md">
              <Building className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1.5">Affiliation</span>
              <span className="text-sm text-slate-700 font-bold leading-tight">{candidate.institutionDetails || "Independent Researcher"}</span>
              <span className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {candidate.institutionalEmail || "Personal Account"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-50 rounded-md">
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1.5">Submission Date</span>
              <span className="text-sm text-slate-700 font-bold">{new Date(candidate.createdAt).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 flex gap-3">
        {candidate.academicStatus === "PENDING" ? (
          <>
            <button 
              onClick={() => setShowConfirmReject(true)}
              disabled={isProcessing}
              className="flex-1 py-2.5 bg-slate-50 text-rose-600 hover:bg-rose-50 border border-slate-100 rounded-md text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <X className="w-3.5 h-3.5" />
              Decline
            </button>
            <button 
              onClick={() => setShowConfirmApprove(true)}
              disabled={isProcessing}
              className="flex-1 py-2.5 bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 rounded-md text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Check className="w-3.5 h-3.5" />
              Authorize
            </button>
          </>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 py-2 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] bg-slate-50 rounded-md border border-slate-100/50">
            <AlertCircle className="w-3 h-3" />
            Historical Record
          </div>
        )}
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog 
        isOpen={showConfirmApprove}
        onClose={() => setShowConfirmApprove(false)}
        onConfirm={() => handleStatusUpdate("APPROVED")}
        title="Authorize Academic Access"
        message={`Authorize high-clearance access for ${candidate.name || candidate.email}? This will update their role immediately.`}
        confirmText="Confirm Authorization"
      />

      <ConfirmDialog 
        isOpen={showConfirmReject}
        onClose={() => setShowConfirmReject(false)}
        onConfirm={() => handleStatusUpdate("REJECTED")}
        title="Decline Application"
        message={`Deny academic credentials for ${candidate.name || candidate.email}? They will retain standard access.`}
        confirmText="Decline Application"
        isDestructive={true}
      />
    </div>
  );
}

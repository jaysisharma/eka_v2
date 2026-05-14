"use client";

import { useCallback } from "react";
import { Modal } from "./modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}: ConfirmDialogProps) {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="space-y-6">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all rounded-none"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className={`flex-1 px-4 py-3 font-bold uppercase tracking-widest text-[10px] transition-all rounded-none ${isDestructive
                ? "bg-red-600 text-white hover:bg-red-500"
                : "bg-[#BA9F59] text-[#020617] hover:bg-white"
              }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
"use client";

import { Trash2, Play, Image as ImageIcon, ExternalLink, Hash, Edit2, Check, X } from "lucide-react";
import { deleteMedia, updateMediaCaption } from "./actions";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function MediaCard({ media }: { media: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCaption, setNewCaption] = useState(media.caption || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteMedia(media.id);
    setIsDeleting(false);
  };

  const handleUpdate = async () => {
    if (!newCaption || newCaption === media.caption) {
      setIsEditing(false);
      return;
    }
    setIsUpdating(true);
    await updateMediaCaption(media.id, newCaption);
    setIsUpdating(false);
    setIsEditing(false);
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Top Bar / Technical Metadata */}
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Hash className="w-3 h-3 text-indigo-500 opacity-60" />
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[120px]">
            ASSET-{media.id.slice(-6).toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">
          <div className={`w-1.5 h-1.5 rounded-full ${media.type === "VIDEO" ? "bg-amber-500" : "bg-blue-500"}`} />
          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{media.type}</span>
        </div>
      </div>

      {/* Media Preview */}
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-100 flex items-center justify-center">
        {media.type === "VIDEO" ? (
          <>
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-slate-800 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                <Play className="w-4 h-4 ml-0.5 fill-current" />
              </div>
            </div>
            <video 
              src={media.url} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              muted
              loop
              onMouseOver={(e) => e.currentTarget.play()}
              onMouseOut={(e) => e.currentTarget.pause()}
            />
          </>
        ) : (
          <img 
            src={media.url} 
            alt={media.caption || "Gallery asset"} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Category Overlay */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-[8px] font-bold text-slate-800 uppercase tracking-widest rounded transition-opacity group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 z-20">
          {media.category}
        </div>
      </div>

      {/* Info & Footer */}
      <div className="p-4 flex flex-col flex-1 gap-4">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-2 text-[11px] font-bold tracking-tight rounded focus:outline-none focus:border-emerald-500 transition-all min-h-[60px] resize-none"
              autoFocus
            />
            <div className="flex gap-1 justify-end">
              <button 
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-all"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <p 
            onClick={() => setIsEditing(true)}
            className="text-[11px] text-slate-500 font-bold tracking-tight leading-relaxed min-h-[30px] line-clamp-2 cursor-pointer hover:text-emerald-600 transition-colors"
          >
            {media.caption || "Awaiting mission description..."}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
          <a 
            href={media.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/link flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
          >
            View Full <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setShowConfirm(true)}
              disabled={isDeleting}
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Media"
        message={`Are you sure you want to permanently delete this asset? This action cannot be undone.`}
        isDestructive={true}
        confirmText="Delete"
      />
    </div>
  );
}

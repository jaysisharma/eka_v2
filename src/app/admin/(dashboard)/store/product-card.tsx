"use client";

import { Trash2, Package, Hash, AlertTriangle, Pencil, CheckCircle2 } from "lucide-react";
import { updateStock, deleteProduct } from "./actions";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import Link from "next/link";
import { formatCurrency } from "@/lib/currency";

export function ProductCard({ 
  product, 
  viewMode = "grid" 
}: { 
  product: any; 
  viewMode?: "grid" | "list";
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleDelete = async () => {
    await deleteProduct(product.id);
  };

  const isAvailable = product.stock > 0;
  const statusLabel = isAvailable ? "Available" : "Disabled";
  const statusColor = isAvailable 
    ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
    : "bg-orange-50 text-orange-600 border-orange-100";

  const dateStr = new Date(product.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  }).replace(/\//g, ".");

  if (viewMode === "list") {
    return (
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6 hover:border-emerald-500/20 transition-all group">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <Package className="w-6 h-6" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 truncate">{product.name}</h3>
          <div className="flex items-center gap-4 mt-1">
            <span className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold ${statusColor}`}>
              {statusLabel}
            </span>
            <span className="text-xs text-slate-400 font-medium">{dateStr}</span>
            <span className="text-xs text-slate-400 font-medium">{product.category || "General"}</span>
          </div>
        </div>

        <div className="text-lg font-bold text-slate-800">
          {formatCurrency(product.price)}
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/admin/store/${product.id}/edit`} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors">
            <Pencil className="w-4 h-4" />
          </Link>
          <button onClick={() => setShowDeleteConfirm(true)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col ${
        isSelected ? "ring-2 ring-emerald-500 ring-offset-2" : ""
      }`}
      onClick={() => setIsSelected(!isSelected)}
    >
      {/* Top Indicators */}
      <div className="absolute top-4 inset-x-4 z-10 flex justify-between items-center pointer-events-none">
        <span className={`px-3 py-1 rounded-full border text-[10px] font-bold shadow-sm backdrop-blur-md pointer-events-auto ${statusColor}`}>
          {statusLabel}
        </span>
        
        <div className="pointer-events-auto">
          {isSelected ? (
            <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-white border-2 border-slate-200 rounded-full shadow-sm" />
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="p-3">
        <div className="aspect-[5/4] rounded-xl overflow-hidden bg-slate-50 relative group-hover:scale-[1.02] transition-transform duration-700">
          {product.images?.[0] ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-10">
              <Package className="w-16 h-16 text-slate-400" />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 min-h-[40px] mb-3 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-slate-400">{dateStr}</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full" />
            <span className="text-[11px] font-semibold text-slate-400 truncate max-w-[60px]">
              {product.category || "General"}
            </span>
          </div>
          <div className="text-[14px] font-bold text-slate-800">
            {formatCurrency(product.price)}
          </div>
        </div>

        {/* Action Overlays (Visible on hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-white via-white to-transparent pt-10">
          <div className="flex gap-2">
            <Link 
              href={`/admin/store/${product.id}/edit`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-600 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Link>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="px-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        isDestructive={true}
      />
    </div>
  );
}

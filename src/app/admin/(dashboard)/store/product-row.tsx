"use client";

import { Trash2, Edit3, Package } from "lucide-react";
import { deleteProduct } from "./actions";

export function ProductRow({ product }: { product: any }) {
  const handleDelete = async () => {
    if (window.confirm(`Delete ${product.name}?`)) {
      await deleteProduct(product.id);
    }
  };

  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#BA9F59]/10 flex items-center justify-center text-[#BA9F59] rounded-none">
            <Package className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-white uppercase tracking-tight">{product.name}</div>
        </div>
      </td>
      <td className="px-6 py-5">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{product.category}</span>
      </td>
      <td className="px-6 py-5">
        <div className="text-xs font-bold text-white tracking-tighter">${product.price.toFixed(2)}</div>
      </td>
      <td className="px-6 py-5">
        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">
          {product.stock} Units
        </div>
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2">
          <button className="p-2 hover:bg-white/10 text-slate-600 transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 hover:bg-red-500/10 text-slate-600 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

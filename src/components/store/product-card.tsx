import {
  ShoppingBag,
  ArrowRight,
  Star,
  Package,
  Heart,
  Zap,
} from "lucide-react";

import { useMemo } from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    isDigital: boolean;
    stock?: number;
  };
  isPremium?: boolean;
}

export function ProductCard({
  product,
  isPremium,
}: ProductCardProps) {
  const discountedPrice = useMemo(() => {
    if (!isPremium) return null;
    return (product.price * 0.8).toFixed(2);
  }, [isPremium, product.price]);

  const stockStatus = useMemo(() => {
    if (product.isDigital) return { label: "Instant Access", color: "text-emerald-400" };
    if (!product.stock || product.stock === 0) return { label: "Out of Inventory", color: "text-red-400" };
    if (product.stock < 10) return { label: `Limited: ${product.stock} units`, color: "text-amber-400" };
    return { label: "In Stock", color: "text-slate-500" };
  }, [product.stock, product.isDigital]);

  return (
    <div className="group bg-[#020617] border border-white/5 hover:border-[#BA9F59]/30 transition-all duration-700 flex flex-col h-full relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#BA9F59]/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Top Utilities */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 delay-100">
        <button className="p-2.5 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-[#BA9F59] hover:text-[#020617] transition-all">
          <Heart className="w-4 h-4" />
        </button>
        <button className="p-2.5 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-[#BA9F59] hover:text-[#020617] transition-all">
          <Zap className="w-4 h-4" />
        </button>
      </div>

      {/* Image Architecture */}
      <div className="aspect-[4/5] bg-black relative overflow-hidden flex items-center justify-center border-b border-white/5">
        <Package className="w-20 h-20 text-white/5 group-hover:scale-110 group-hover:text-[#BA9F59]/10 transition-all duration-1000" />
        
        {/* Dynamic Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-black tracking-[0.3em] text-white uppercase">
            {product.category}
          </div>
          {discountedPrice && (
            <div className="px-3 py-1 bg-[#BA9F59] text-[#020617] text-[8px] font-black tracking-[0.3em] uppercase">
              Member -20%
            </div>
          )}
        </div>

        {/* Hover Action Terminal */}
        <div className="absolute inset-0 bg-[#020617]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-10 text-center">
          <div className="mb-8 space-y-4">
            <div className="text-[10px] font-black text-[#BA9F59] uppercase tracking-[0.4em]">Asset Overview</div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed line-clamp-4">
              {product.description}
            </p>
          </div>
          <button className="w-full bg-[#BA9F59] text-[#020617] py-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-3 shadow-[4px_4px_0_0_rgba(186,159,89,0.3)] active:translate-x-1 active:translate-y-1 active:shadow-none">
            Procure Item <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Meta */}
      <div className="p-8 flex-1 flex flex-col space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider group-hover:text-[#BA9F59] transition-colors leading-tight line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 text-[#BA9F59] shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#BA9F59]" />
              <span className="text-[10px] font-black">{product.rating}</span>
            </div>
          </div>
          <div className={`text-[9px] font-bold uppercase tracking-widest ${stockStatus.color}`}>
            {stockStatus.label}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-end justify-between">
          <div className="space-y-1">
            {discountedPrice ? (
              <>
                <div className="text-[9px] font-bold text-slate-600 line-through tracking-widest uppercase">
                  MSRP ${product.price.toFixed(2)}
                </div>
                <div className="text-xl font-black text-white tracking-tighter flex items-center gap-2">
                  ${discountedPrice}
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 font-black uppercase">Verified</span>
                </div>
              </>
            ) : (
              <div className="text-xl font-black text-white tracking-tighter">
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>

          <button className="w-12 h-12 bg-white/5 border border-white/10 text-[#BA9F59] hover:bg-[#BA9F59] hover:text-[#020617] transition-all flex items-center justify-center group/cart">
            <ShoppingBag className="w-5 h-5 group-hover/cart:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
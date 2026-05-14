"use client";

import { useState, useMemo } from "react";
import { ShoppingCart, Heart, Eye, Filter, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useSession } from "next-auth/react";
import { CartSidebar } from "./cart-sidebar";

export function StoreClient({ initialProducts, isPremiumUser, categories = ["ALL"] }: { 
  initialProducts: any[], 
  isPremiumUser: boolean,
  categories?: string[]
}) {
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      const matchesCategory = activeCategory === "ALL" || p.category === activeCategory;
      return matchesCategory;
    });
  }, [initialProducts, activeCategory]);

  return (
    <div className="space-y-16">
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Improved Category Navigation - Underlined Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 gap-8">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? "text-primary" 
                : "text-slate-500 hover:text-white"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-in fade-in slide-in-from-left-2 duration-300" />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 pb-4 md:pb-0">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            Showing {filteredProducts.length} Products
          </span>
          <div className="h-4 w-px bg-white/10" />
          <button className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest hover:text-primary transition-colors">
            <Filter className="w-3 h-3" /> Sort By
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group space-y-6">
            <div className="relative aspect-[4/5] bg-white/[0.03] rounded-2xl overflow-hidden transition-all duration-500 group-hover:bg-white/[0.05]">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <Link 
                  href={`/store/${product.id}`}
                  className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </Link>
              </div>

              {/* Enhanced Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#BA9F59] text-[#020617] text-[8px] font-black px-2 py-1 uppercase tracking-widest rounded-sm shadow-lg">
                  {product.category}
                </span>
              </div>

              {product.stock < 10 && product.stock > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[8px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                  Limited
                </div>
              )}
            </div>

            <div className="space-y-3 px-1">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-500">Inventory Status</span>
                <span className="text-emerald-500">In Stock</span>
              </div>
              
              <Link href={`/store/${product.id}`} className="block">
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors leading-tight min-h-[3rem]">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <p className="text-xl font-bold text-white">${product.price.toFixed(2)}</p>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-2 group/btn"
                >
                  Add to Cart <Plus className="w-3 h-3 group-hover/btn:rotate-90 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-32 text-center border border-white/5 bg-white/[0.02] rounded-3xl">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">No products found.</p>
        </div>
      )}
    </div>
  );
}

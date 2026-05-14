import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { StoreClient } from "./store-client";
import { 
  ShoppingBag, 
  Search,
} from "lucide-react";

export default async function EkaStore() {
  const session = await auth();
  const isPremiumUser = (session?.user as any)?.role === "ACADEMIC_PREMIUM" || (session?.user as any)?.role === "ADMIN";

  // Fetch real products from DB
  let products = await prisma.storeProduct.findMany({
    orderBy: { createdAt: "desc" }
  });

  // Extract unique categories dynamically
  const dynamicCategories = Array.from(new Set(products.map(p => p.category)));
  const allCategories = ["ALL", ...dynamicCategories.sort()];

  const mappedProducts = products.map(p => ({
    ...p,
    image: p.images[0] || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
    rating: 5.0,
    isDigital: p.category === "RESEARCH" || p.category === "EDUCATION"
  }));

  return (
    <main className="min-h-screen bg-[#020617] text-white font-jakarta">
      {/* Simple Store Header */}
      <div className="pt-32 pb-10 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Eka Store</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Official Merchandise & Research</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 w-64 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <StoreClient 
          initialProducts={mappedProducts} 
          isPremiumUser={isPremiumUser} 
          categories={allCategories}
        />
      </div>

      <footer className="mt-32 py-20 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto px-6 text-center space-y-6">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.3em]">Official Store</p>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Standard shipping applies to all orders. Digital products are delivered instantly.
          </p>
        </div>
      </footer>
    </main>
  );
}

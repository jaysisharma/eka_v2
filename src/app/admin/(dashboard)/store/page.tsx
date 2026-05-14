import prisma from "@/lib/prisma";
import { ShoppingBag, Package, TrendingUp, Activity } from "lucide-react";
import { ProductList } from "./product-list";

export default async function AdminStore() {
  const products = await prisma.storeProduct.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Products</h2>
      </div>

      <ProductList initialProducts={products} />
    </div>
  );
}

function MiniStat({ label, value, isAlert }: { label: string; value: number; isAlert?: boolean }) {
  return (
    <div className="flex flex-col items-end">
      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</span>
      <span className={`text-2xl font-black tracking-tighter leading-none ${isAlert ? "text-red-500" : "text-white"}`}>
        {value.toLocaleString()}
      </span>
    </div>
  );
}

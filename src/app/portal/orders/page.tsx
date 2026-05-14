import { ShoppingBag, Box, Truck, CheckCircle2, ArrowRight } from "lucide-react";

const ORDERS = [
  { id: "ORD-9281", item: "Eka Founder's Hoodie", status: "SHIPPED", date: "May 02, 2026", price: "$65.00" },
  { id: "ORD-8172", item: "Propulsion Data Pack v1", status: "DELIVERED", date: "Apr 25, 2026", price: "$25.00" },
];

export default function MyOrders() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Mission Procurement</h1>
        <p className="text-slate-500 mt-1">Review your institutional hardware and digital asset orders.</p>
      </header>

      <div className="space-y-4">
        {ORDERS.map((order) => (
          <div key={order.id} className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{order.item}</h3>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                  Order ID: {order.id} • Purchased {order.date}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right hidden md:block">
                <div className="text-lg font-black text-white">{order.price}</div>
                <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Charged to Institutional Card</div>
              </div>
              
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-tighter ${
                order.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-400/10 text-blue-400 border-blue-400/20'
              }`}>
                {order.status === 'DELIVERED' ? <CheckCircle2 className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                {order.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

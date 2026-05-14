"use client";

import { useCart } from "@/context/cart-context";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, UserPlus, CheckCircle2, MapPin, CreditCard, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { createGuestAccount } from "./actions";
import { useSession, signIn } from "next-auth/react";

type CheckoutStep = "cart" | "account" | "address" | "payment" | "success";

export function CartSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { data: session } = useSession();
  const [step, setStep] = useState<CheckoutStep>("cart");
  
  // Form States
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({ street: "", city: "", zip: "" });
  const [payment, setPayment] = useState({ card: "", expiry: "", cvc: "" });
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    if (step === "cart") {
      if (session) setStep("address");
      else setStep("account");
    } else if (step === "account") {
      setStep("address");
    } else if (step === "address") {
      setStep("payment");
    } else if (step === "payment") {
      handleCompleteOrder();
    }
  };

  const prevStep = () => {
    if (step === "account") setStep("cart");
    else if (step === "address") setStep(session ? "cart" : "account");
    else if (step === "payment") setStep("address");
  };

  const handleCompleteOrder = async () => {
    setLoading(true);
    // If guest, create account first
    if (!session && email) {
      await createGuestAccount(email);
      await signIn("credentials", { email, password: "eka_guest_auth_2026", redirect: false });
    }
    
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setStep("success");
    clearCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#0B1120] border-l border-white/10 h-full flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step !== "cart" && step !== "success" && (
              <button onClick={prevStep} className="p-1 hover:text-primary transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              {step === "cart" ? "Shopping Cart" : 
               step === "account" ? "Account" :
               step === "address" ? "Delivery" :
               step === "payment" ? "Payment" : "Success"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {step === "cart" && (
            <div className="space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center pt-20 space-y-4 opacity-40">
                  <ShoppingBag className="w-12 h-12" />
                  <p className="text-xs font-bold uppercase tracking-widest">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h4 className="text-sm font-bold text-white leading-tight">{item.name}</h4>
                      <p className="text-primary font-bold text-sm">${item.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {step === "account" && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <UserPlus className="w-5 h-5" />
                  <h3 className="font-bold uppercase text-[11px] tracking-widest">Join the Network</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">Please enter your email to continue. We'll create your account automatically.</p>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-4 px-6 text-sm text-white focus:border-primary/50 outline-none"
                />
              </div>
            </div>
          )}

          {step === "address" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-3 text-primary">
                <MapPin className="w-5 h-5" />
                <h3 className="font-bold uppercase text-[11px] tracking-widest">Shipping Address</h3>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Street Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white focus:border-primary/50 outline-none"
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="City"
                    className="bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white focus:border-primary/50 outline-none"
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="ZIP Code"
                    className="bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white focus:border-primary/50 outline-none"
                    onChange={(e) => setAddress({...address, zip: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-3 text-primary">
                <CreditCard className="w-5 h-5" />
                <h3 className="font-bold uppercase text-[11px] tracking-widest">Payment Method</h3>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Card Number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-sm text-white focus:border-primary/50 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    className="bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white focus:border-primary/50 outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="CVC"
                    className="bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white focus:border-primary/50 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="h-full flex flex-col items-center justify-center space-y-6 text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Order Received</h3>
                <p className="text-sm text-slate-400">Confirmation sent to {email || (session?.user as any)?.email}.</p>
              </div>
              <button onClick={onClose} className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all">
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== "success" && cart.length > 0 && (
          <div className="p-8 border-t border-white/5 bg-white/[0.02] space-y-6">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span>Total</span>
              <span className="text-white text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={nextStep}
              disabled={loading}
              className="w-full bg-primary text-[#020617] py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Processing..." : step === "payment" ? "Complete Purchase" : "Continue"} 
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

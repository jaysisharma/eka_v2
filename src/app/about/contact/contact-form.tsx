"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { submitContactForm } from "./actions";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-12 rounded-[2rem] text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Message Sent</h2>
          <p className="text-slate-400 text-sm">We have received your inquiry and will get back to you shortly.</p>
        </div>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-white transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Email Us</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Fill out the form below</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
          <input 
            name="name"
            type="text" 
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm outline-none focus:border-primary/50 transition-all text-white" 
            placeholder="Your Name" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
          <input 
            name="email"
            type="email" 
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm outline-none focus:border-primary/50 transition-all text-white" 
            placeholder="your@email.com" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
          <textarea 
            name="message"
            rows={6} 
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm outline-none focus:border-primary/50 transition-all resize-none text-white" 
            placeholder="How can we help?"
          ></textarea>
        </div>

        {error && (
          <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
        )}

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-black py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>Send Email <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>
    </div>
  );
}

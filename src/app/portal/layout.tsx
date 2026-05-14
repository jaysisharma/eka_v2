"use client";

import { 
  LayoutDashboard, 
  Briefcase, 
  Ticket, 
  ShoppingBag, 
  Bookmark, 
  ShieldCheck, 
  Settings,
  LogOut,
  User,
  Activity,
  X,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";

function SidebarContent() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showUpgrade, setShowUpgrade] = useState(false);



  useEffect(() => {
    // Show upgrade widget if payment failed or user is not premium
    const paymentFailed = searchParams.get("payment") === "failed";
    const isPremium = (session?.user as any)?.role === "PREMIUM";
    
    // Only update if the value actually needs to change to avoid loops
    const shouldShow = !!(paymentFailed || !isPremium);
    
    if (shouldShow !== showUpgrade) {
      setShowUpgrade(shouldShow);
    }
  }, [searchParams, session, showUpgrade]);

  return (
    <aside className="w-64 border-r border-white/10 flex flex-col bg-[#020617] h-full">
      {/* Simple Profile Section */}
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center">
            <User className="w-5 h-5 text-[#BA9F59]" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white uppercase tracking-tight truncate">
              {session?.user?.name || "Researcher"}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <PortalNavLink href="/portal/dashboard" icon={<Activity className="w-4 h-4" />} label="Overview" active={pathname === "/portal/dashboard"} />
        <PortalNavLink href="/portal/applications" icon={<Briefcase className="w-4 h-4" />} label="Applications" active={pathname === "/portal/applications"} />
        <PortalNavLink href="/portal/events" icon={<Ticket className="w-4 h-4" />} label="Event Tickets" active={pathname === "/portal/events"} />
        <PortalNavLink href="/portal/orders" icon={<ShoppingBag className="w-4 h-4" />} label="Orders" active={pathname === "/portal/orders"} />
        <PortalNavLink href="/portal/bookmarks" icon={<Bookmark className="w-4 h-4" />} label="Bookmarks" active={pathname === "/portal/bookmarks"} />
        <PortalNavLink href="/portal/verify" icon={<ShieldCheck className="w-4 h-4" />} label="Verification" active={pathname === "/portal/verify"} />
        
        {/* Upgrade Widget */}
        {showUpgrade && (
          <div className="mt-8 p-4 bg-[#BA9F59]/5 border border-[#BA9F59]/20 relative group">
            <button 
              onClick={() => setShowUpgrade(false)}
              className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#BA9F59]" />
              <span className="text-[9px] font-bold text-white uppercase tracking-widest">Eka Pro Access</span>
            </div>
            <p className="text-[9px] text-slate-500 leading-relaxed mb-3">
              Unlock advanced datasets and priority research clusters.
            </p>
            <Link 
              href="/onboarding/upgrade"
              className="block w-full py-2 bg-[#BA9F59] text-[#020617] text-center text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all"
            >
              Upgrade Now
            </Link>
          </div>
        )}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <PortalNavLink href="/settings" icon={<Settings className="w-4 h-4" />} label="Settings" active={pathname === "/settings"} />
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition-all mt-1"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#020617] text-slate-300 font-barlow overflow-hidden">
      <Suspense fallback={<div className="w-64 bg-[#020617] border-r border-white/10" />}>
        <SidebarContent />
      </Suspense>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#020617] flex flex-col">
        {/* Minimal Header */}
        <header className="h-14 border-b border-white/5 flex items-center px-10 bg-black/10 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Portal / <span className="text-white">{pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}</span>
          </div>
        </header>

        <div className="flex-1 p-10 relative custom-scrollbar overflow-y-auto">
          {/* Subtle Ambience */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#BA9F59]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function PortalNavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-none border-l-2 ${
        active 
          ? "bg-white/5 text-white border-[#BA9F59]" 
          : "text-slate-500 hover:text-white border-transparent hover:bg-white/5"
      }`}
    >
      <span className={`${active ? "text-[#BA9F59]" : "text-slate-500"} transition-colors`}>
        {icon}
      </span>
      {label}
    </Link>
  );
}

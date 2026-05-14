"use client";

import {
  User,
  UserCheck,
  FileText,
  Calendar,
  Globe,
  Newspaper,
  ShoppingBag,
  Image as ImageIcon,
  Settings,
  LogOut,
  Rocket,
  Briefcase,
  BarChart3,
  Search,
  Plus,
  Bell,
  ChevronDown,
  LayoutDashboard,
  MessageSquare,
  CheckSquare,
  FolderOpen,
  StickyNote,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#F0F2F5] text-[#020617] font-jakarta">
      {/* Sidebar - Dark Navy */}
      <aside className="w-[260px] flex flex-col bg-[#0B1120] text-slate-400 overflow-y-auto">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-full blur-[1px] opacity-80" />
          </div>
          <span className="font-semibold text-white text-lg tracking-tight italic">Eka</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <SidebarLink href="/admin" icon={<BarChart3 className="w-[18px] h-[18px]" />} label="Dashboard" active={pathname === "/admin"} />
          <SidebarLink href="/admin/users" icon={<User className="w-[18px] h-[18px]" />} label="Users" active={pathname === "/admin/users"} />
          <SidebarLink href="/admin/verification" icon={<UserCheck className="w-[18px] h-[18px]" />} label="Check Users" active={pathname === "/admin/verification"} />
          <SidebarLink href="/admin/opportunities" icon={<Briefcase className="w-[18px] h-[18px]" />} label="Jobs" active={pathname === "/admin/opportunities"} />
          <SidebarLink href="/admin/papers" icon={<FileText className="w-[18px] h-[18px]" />} label="Papers" active={pathname === "/admin/papers"} />
          <SidebarLink href="/admin/projects" icon={<Globe className="w-[18px] h-[18px]" />} label="Projects" active={pathname === "/admin/projects"} />
          <SidebarLink href="/admin/events" icon={<Calendar className="w-[18px] h-[18px]" />} label="Events" active={pathname === "/admin/events"} />
          <SidebarLink href="/admin/news" icon={<Newspaper className="w-[18px] h-[18px]" />} label="News" active={pathname === "/admin/news"} />
          <SidebarLink href="/admin/store" icon={<ShoppingBag className="w-[18px] h-[18px]" />} label="Store" active={pathname.startsWith("/admin/store")} />
          <SidebarLink href="/admin/gallery" icon={<ImageIcon className="w-[18px] h-[18px]" />} label="Photos" active={pathname === "/admin/gallery"} />
          <SidebarLink href="/admin/messages" icon={<MessageSquare className="w-[18px] h-[18px]" />} label="Messages" active={pathname === "/admin/messages"} />
        </nav>

        <div className="p-4 border-t border-white/5">
          <SidebarLink href="/admin/settings" icon={<Settings className="w-[18px] h-[18px]" />} label="Settings" active={pathname === "/admin/settings"} />
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all rounded-md">
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Institutional Header */}
        <header className="h-[70px] bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-800 tracking-tight uppercase">Admin Dashboard</h1>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Control</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrator</span>
                <span className="text-xs font-bold text-slate-700">Authenticated Session</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=admin&backgroundColor=f8fafc"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active,
  isSublink,
  badge
}: {
  href: string;
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  isSublink?: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium transition-all ${active
          ? "bg-emerald-500/10 text-emerald-500"
          : "text-slate-400 hover:text-white hover:bg-white/5"
        }`}
    >
      <div className="flex items-center gap-3">
        {icon && <span className={`${active ? "text-emerald-500" : "text-slate-500"}`}>{icon}</span>}
        <span className={isSublink ? "ml-1" : ""}>{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {active && !isSublink && (
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      )}
    </Link>
  );
}

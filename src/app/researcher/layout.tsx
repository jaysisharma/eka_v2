import { 
  FlaskConical, 
  FilePlus, 
  FileText, 
  Globe, 
  Users, 
  BookOpen,
  Settings, 
  LogOut,
  Rocket,
  Activity,
  BarChart3
} from "lucide-react";
import Link from "next/link";

export default function ResearcherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#020617] text-slate-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col bg-black/20">
        <div className="p-6 flex items-center gap-2">
          <FlaskConical className="text-primary w-6 h-6" />
          <span className="font-black tracking-tighter uppercase text-white">Eka Lab</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <ResearcherNavLink href="/researcher" icon={<Activity className="w-4 h-4" />} label="Overview" />
          <ResearcherNavLink href="/researcher/analytics" icon={<BarChart3 className="w-4 h-4" />} label="Impact Analytics" />
          <ResearcherNavLink href="/researcher/papers" icon={<FileText className="w-4 h-4" />} label="My Papers" />
          <ResearcherNavLink href="/researcher/papers/new" icon={<FilePlus className="w-4 h-4" />} label="Submit Paper" />
          <ResearcherNavLink href="/researcher/projects" icon={<Globe className="w-4 h-4" />} label="Active Projects" />
          <ResearcherNavLink href="/researcher/collaborations" icon={<Users className="w-4 h-4" />} label="Collaborations" />
          <ResearcherNavLink href="/researcher/mentorship" icon={<BookOpen className="w-4 h-4" />} label="Mentorship" />
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <ResearcherNavLink href="/settings" icon={<Settings className="w-4 h-4" />} label="Lab Settings" />
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Top Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
        {children}
      </main>
    </div>
  );
}

function ResearcherNavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 hover:text-white transition-all"
    >
      {icon}
      {label}
    </Link>
  );
}

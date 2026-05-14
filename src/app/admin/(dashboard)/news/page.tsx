import prisma from "@/lib/prisma";
import { 
  Newspaper, 
  Plus, 
  FileText, 
  Star,
  Bookmark,
  Zap,
  Activity
} from "lucide-react";
import NewsList from "./news-list";

export default async function AdminNews() {
  const articles = await prisma.newsArticle.findMany({
    orderBy: { createdAt: "desc" }
  });

  const featuredCount = articles.filter(a => a.isFeatured).length;
  const categoriesCount = new Set(articles.map(a => a.category)).size;

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">News & Announcements</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">Manage institutional updates and research dispatches</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Articles" 
          value={articles.length.toString()} 
          icon={<Newspaper className="w-5 h-5 text-indigo-500" />}
          color="bg-indigo-50"
        />
        <StatCard 
          label="Featured News" 
          value={featuredCount.toString()} 
          icon={<Star className="w-5 h-5 text-amber-500" />}
          color="bg-amber-50"
        />
        <StatCard 
          label="Active Categories" 
          value={categoriesCount.toString()} 
          icon={<Activity className="w-5 h-5 text-emerald-500" />}
          color="bg-emerald-50"
        />
      </div>

      {/* News Inventory List */}
      <NewsList initialArticles={articles.map(a => ({
        ...a,
        createdAt: new Date(a.createdAt)
      }))} />
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-4 ${color} rounded-md transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-800 leading-none">{value}</div>
          <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Star, 
  Globe, 
  Newspaper, 
  Loader2
} from "lucide-react";
import Link from "next/link";
import { deleteNews, toggleFeatured } from "./actions";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string | null;
  isFeatured: boolean;
  createdAt: Date;
}

export default function NewsList({ initialArticles }: { initialArticles: NewsArticle[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(initialArticles.map(a => a.category)))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    setIsDeleting(id);
    const result = await deleteNews(id);
    if (result.success) {
      setArticles(articles.filter(a => a.id !== id));
    }
    setIsDeleting(null);
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    const result = await toggleFeatured(id, !currentStatus);
    if (result.success) {
      setArticles(articles.map(a => a.id === id ? { ...a, isFeatured: !currentStatus } : a));
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search news by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500/30 text-sm text-slate-600 rounded-md transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-auto appearance-none bg-white border border-slate-200 rounded-md py-2.5 pl-9 pr-8 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <Link 
            href="/admin/news/create"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0B1120] text-white rounded-md text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-100"
          >
            <Plus className="w-4 h-4" />
            Create News
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Article Title</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Category</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Featured</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Newspaper className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="text-sm font-bold">No news articles found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                          {article.imageUrl ? (
                            <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <Globe className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="max-w-md">
                          <div className="text-sm font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1">{article.title}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5 flex items-center gap-2">
                            {new Date(article.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                            ID: {article.id.slice(-6).toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-2.5 py-1 bg-white text-slate-600 rounded-md text-[9px] font-bold uppercase tracking-widest border border-slate-200 shadow-sm">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => handleToggleFeatured(article.id, article.isFeatured)}
                          className={`p-1.5 rounded-full transition-all ${article.isFeatured ? 'bg-amber-100 text-amber-500 border border-amber-200' : 'text-slate-200 hover:text-slate-400'}`}
                        >
                          <Star className={`w-4 h-4 ${article.isFeatured ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <Link 
                          href={`/admin/news/${article.id}/edit`}
                          className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-md transition-all" 
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(article.id)}
                          disabled={isDeleting === article.id}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all" 
                          title="Delete"
                        >
                          {isDeleting === article.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

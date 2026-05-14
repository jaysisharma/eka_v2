"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Eye, 
  Star, 
  Globe, 
  MoreVertical, 
  Newspaper, 
  Loader2, 
  X, 
  Check,
  Upload,
  Image as ImageIcon,
  ChevronLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createNews, updateNews, uploadNewsImage } from "./actions";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string | null;
  isFeatured: boolean;
}

export default function NewsForm({ initialData, isEditing = false }: { initialData?: NewsArticle, isEditing?: boolean }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    category: initialData?.category || "General",
    imageUrl: initialData?.imageUrl || "",
    isFeatured: initialData?.isFeatured || false
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const form = new FormData();
    form.append("file", file);

    const result = await uploadNewsImage(form);
    if (result.success && result.url) {
      setFormData(prev => ({ ...prev, imageUrl: result.url }));
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isEditing && initialData) {
        const result = await updateNews(initialData.id, formData);
        if (result.success) router.push("/admin/news");
      } else {
        const result = await createNews(formData);
        if (result.success) router.push("/admin/news");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{isEditing ? 'Edit Article' : 'Create News Article'}</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">Compose and publish official institutional communications</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Article Title</label>
              <input 
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm font-medium"
                placeholder="Enter article headline..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Article Content</label>
              <textarea 
                required
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm font-medium resize-none"
                placeholder="Compose the detailed news content here..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar / Configuration Area */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <input 
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm font-medium"
                placeholder="e.g. Research, Mission"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Featured Article</label>
              <div 
                onClick={() => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${formData.isFeatured ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Star className={`w-4 h-4 ${formData.isFeatured ? 'fill-current' : ''}`} />
                  <span className="text-xs font-bold uppercase tracking-wider">Highlight Article</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.isFeatured ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}`}>
                  {formData.isFeatured && <Check className="w-2.5 h-2.5 text-white stroke-[4]" />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Visual Asset</label>
            <div className="relative group aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center transition-all hover:border-emerald-500/50 hover:bg-emerald-50/20">
              {formData.imageUrl ? (
                <>
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imageUrl: "" }))}
                      className="p-2 bg-rose-500 text-white rounded-lg shadow-lg hover:bg-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={`flex flex-col items-center transition-all ${isUploading ? 'opacity-0' : 'opacity-100'}`}>
                    <Upload className="w-6 h-6 text-slate-300 mb-2" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Upload Image</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                      <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                      <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest mt-2">Syncing...</span>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Direct URL</label>
              <input 
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-[10px] font-medium"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting || isUploading}
              className="w-full py-4 bg-[#0B1120] text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? 'Update Article' : 'Publish Article'}
            </button>
            <button 
              type="button" 
              onClick={() => router.back()}
              className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

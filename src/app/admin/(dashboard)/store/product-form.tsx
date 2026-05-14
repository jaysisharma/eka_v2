"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, AlertCircle, ArrowLeft, Save, Loader2 } from "lucide-react";
import { createProduct, updateProduct, uploadProductImage } from "./actions";
import Link from "next/link";
import { getCurrencySymbol } from "@/lib/currency";

interface ProductFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const COMMON_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export function ProductForm({ initialData, isEditing }: ProductFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price?.toString() || "",
    stock: initialData?.stock?.toString() || "",
    category: initialData?.category || "Gear",
    sizes: initialData?.sizes || [] as string[],
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.images?.[0] || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB limit.");
        return;
      }
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s: string) => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    let imageUrl = initialData?.images?.[0] || "";
    if (file) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const uploadResult = await uploadProductImage(uploadData);
      if (uploadResult.success) {
        imageUrl = uploadResult.url!;
      } else {
        setError("Image upload failed.");
        setIsSaving(false);
        return;
      }
    }

    const payload = {
      ...formData,
      price: Number(formData.price) || 0,
      stock: Number(formData.stock) || 0,
      image: imageUrl,
    };

    const result = isEditing 
      ? await updateProduct(initialData.id, payload)
      : await createProduct(payload);

    if (result.success) {
      router.push("/admin/store");
      router.refresh();
    } else {
      setError(result.error || "Failed to save product.");
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-12">
        <Link 
          href="/admin/store"
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Store</span>
        </Link>
        <div className="text-right">
          <div className="text-[#BA9F59] text-[10px] font-black uppercase tracking-[0.3em] mb-1">
            Manage Products
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Media */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Product Image</label>
            <div className="relative aspect-square bg-black border border-white/5 overflow-hidden group">
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-white" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-white">Click to change</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="p-4 bg-[#BA9F59]/5 border border-[#BA9F59]/20 text-[#BA9F59]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">2MB Limit</span>
                </div>
              )}
              <input 
                type="file" 
                onChange={handleFileChange}
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          
          <div className="p-6 bg-[#BA9F59]/5 border border-[#BA9F59]/10 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#BA9F59] shrink-0" />
              <div className="space-y-1">
                <div className="text-[10px] font-black text-[#BA9F59] uppercase tracking-widest leading-none">Notice</div>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                  All product changes are saved to the store database. Please ensure the details are correct.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Product Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black border border-white/10 p-5 text-sm text-white focus:outline-none focus:border-[#BA9F59] rounded-none font-bold"
                placeholder="Enter product name..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Description</label>
              <textarea 
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-black border border-white/10 p-5 text-sm text-white focus:outline-none focus:border-[#BA9F59] rounded-none h-40 resize-none font-bold"
                placeholder="Write a short description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Price ({getCurrencySymbol()})</label>
                <input 
                  type="text" 
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-black border border-white/10 p-5 text-sm text-white focus:outline-none focus:border-[#BA9F59] rounded-none font-black"
                  placeholder={`${getCurrencySymbol()} 0.00`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Stock</label>
                <input 
                  type="text" 
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full bg-black border border-white/10 p-5 text-sm text-white focus:outline-none focus:border-[#BA9F59] rounded-none font-black"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Category</label>
              <input 
                type="text" 
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-black border border-white/10 p-5 text-sm text-white focus:outline-none focus:border-[#BA9F59] rounded-none font-bold"
                placeholder="Gear, Apparel, etc..."
              />
            </div>

            {/* Dynamic Sizes Terminal */}
            <div className="space-y-4 pt-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Available Sizes</label>
              <div className="flex flex-wrap gap-2">
                {COMMON_SIZES.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest border transition-all rounded-none ${
                      formData.sizes.includes(size)
                        ? "bg-[#BA9F59] border-[#BA9F59] text-[#020617]"
                        : "bg-transparent border-white/10 text-slate-500 hover:border-white/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                Select the sizes available for this product.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/5 border border-red-500/20 flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={isSaving}
            className="w-full bg-[#BA9F59] text-[#020617] py-6 font-black uppercase tracking-[0.4em] text-xs hover:bg-white transition-all rounded-none disabled:opacity-50 shadow-2xl shadow-[#BA9F59]/20 flex items-center justify-center gap-3"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? "Save Changes" : "Add Product"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

import prisma from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  category: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default async function NewsArchive() {
  const articles = await prisma.newsArticle.findMany({
    orderBy: { createdAt: "desc" },
    take: 10
  }) as NewsArticle[];

  if (articles.length === 0) {
    return (
      <main className="min-h-screen bg-[#0B1120] pt-40 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">No news articles found.</h1>
          <p className="mt-4 text-slate-400">Check back later for updates from Eka.</p>
        </div>
      </main>
    );
  }

  const heroArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <main className="min-h-screen bg-[#0B1120] text-white font-jakarta selection:bg-blue-500/10">
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        {/* Hero Article */}
        <div className="mb-24 grid lg:grid-cols-2 gap-12 items-center group">
          <Link href={`/news/${heroArticle.id}`} className="block relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm transition-all group-hover:shadow-xl">
            <img 
              src={heroArticle.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000"} 
              alt={heroArticle.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          <div className="space-y-6">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded uppercase tracking-wider">
              {heroArticle.category}
            </span>
            <Link href={`/news/${heroArticle.id}`}>
              <h2 className="text-3xl md:text-5xl font-bold text-white hover:text-primary transition-colors leading-tight">
                {heroArticle.title}
              </h2>
            </Link>
            <p className="text-slate-400 text-lg line-clamp-3 leading-relaxed">
              {heroArticle.content.substring(0, 200)}...
            </p>
            <Link 
              href={`/news/${heroArticle.id}`} 
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-all group/link"
            >
              Read more <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {remainingArticles.map((article: NewsArticle) => (
            <article key={article.id} className="group flex flex-col space-y-5">
              <Link href={`/news/${article.id}`} className="block relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg transition-all group-hover:shadow-primary/5 border border-white/5">
                <img 
                  src={article.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000"} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 bg-white/10 text-white text-[9px] font-bold rounded uppercase tracking-wider">
                  {article.category}
                </span>
                <Link href={`/news/${article.id}`}>
                  <h3 className="text-xl font-bold text-white hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                  {article.content.substring(0, 150)}...
                </p>
                <Link 
                  href={`/news/${article.id}`} 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-primary transition-all group/link"
                >
                  Read more <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

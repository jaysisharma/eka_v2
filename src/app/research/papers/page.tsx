import prisma from "@/lib/prisma";
import PaperList from "./paper-list";

export default async function ResearchPapersPage() {
  const papers = await prisma.researchPaper.findMany({
    where: { status: "PUBLISHED" },
    include: {
      author: {
        select: { name: true }
      }
    },
    orderBy: { publishedAt: "desc" }
  });

  return (
    <main className="min-h-screen bg-[#0B1120] text-white font-jakarta selection:bg-primary/20 pb-32">
      <div className="max-w-7xl mx-auto px-6 pt-40">
        <header className="max-w-3xl mb-20 space-y-6">
          <div className="flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.3em]">
            <div className="w-12 h-[1px] bg-primary/40" />
            Scholarly Registry
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Research Papers
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
            Explore our repository of peer-reviewed mission reports, technical whitepapers, and academic breakthroughs in aerospace research.
          </p>
        </header>

        <PaperList initialPapers={JSON.parse(JSON.stringify(papers))} />
      </div>
    </main>
  );
}

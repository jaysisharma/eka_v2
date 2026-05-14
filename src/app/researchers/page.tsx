import prisma from "@/lib/prisma";
import ResearcherList from "./researcher-list";

export interface Researcher {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  role: string;
}

export default async function ResearchersPage() {
  const researchers = await prisma.user.findMany({
    where: { role: "RESEARCHER" },
    orderBy: { name: "asc" }
  }) as Researcher[];

  return (
    <main className="min-h-screen bg-[#020617] text-white font-jakarta selection:bg-primary/20 pb-32">
      <div className="max-w-7xl mx-auto px-6 pt-40">
        <header className="max-w-3xl mb-20 space-y-6">
          <div className="flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.3em]">
            <div className="w-12 h-[1px] bg-primary/40" />
            Faculty Directory
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white uppercase">
            Our <span className="text-primary italic">Personnel</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
            A comprehensive registry of the world-class scientists and mission architects leading our aerospace research initiatives.
          </p>
        </header>

        <ResearcherList initialResearchers={JSON.parse(JSON.stringify(researchers))} />
      </div>
    </main>
  );
}

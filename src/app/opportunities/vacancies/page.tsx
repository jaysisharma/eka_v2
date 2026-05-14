import prisma from "@/lib/prisma";
import VacancyList from "./vacancy-list";

export default async function VacanciesPage() {
  const opportunities = await prisma.opportunity.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen bg-[#0B1120] text-white font-jakarta selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <header className="mb-20 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Join the Mission
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-slate-400 tracking-wide">
            Help us push the boundaries of aerospace research and exploration.
          </p>
        </header>

        <VacancyList initialOpportunities={JSON.parse(JSON.stringify(opportunities))} />
      </div>
    </main>
  );
}

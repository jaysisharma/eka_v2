import prisma from "@/lib/prisma";
import GalleryContent from "./gallery-content";

export default async function MediaGallery() {
  const media = await prisma.galleryMedia.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen bg-[#0B1120] text-white font-jakarta selection:bg-emerald-500/30">
      <div className="max-w-[1400px] mx-auto px-6 pt-40 pb-32">
        <header className="mb-20 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Our Journey in Photos
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-slate-400 tracking-wide">
            A collection of moments from our labs, events, and the people behind our missions.
          </p>
        </header>

        <GalleryContent initialMedia={JSON.parse(JSON.stringify(media))} />
      </div>
    </main>
  );
}

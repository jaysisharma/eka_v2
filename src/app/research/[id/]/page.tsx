import { 
  FileText, 
  Download, 
  Calendar, 
  User, 
  Share2, 
  Lock,
  MessageSquare,
  Heart,
  Eye,
  ArrowLeft
} from "lucide-react";
import { auth } from "@/lib/auth";

export default async function PaperDetails({ params }: { params: { id: string } }) {
  const session = await auth();
  const userRole = session?.user?.role;
  const isPremium = true; // Mock: Assume this specific paper is a premium paper
  const isUserPremium = userRole === "ACADEMIC_PREMIUM" || userRole === "ADMIN";

  return (
    <main className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto relative z-10">
        <Link 
          href="/research" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Archive
        </Link>

        {/* Header Section */}
        <header className="space-y-6 mb-12">
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black tracking-widest text-primary uppercase">
              PROPULSION
            </span>
            {isPremium && (
              <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <Lock className="w-3 h-3" />
                Premium Research
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight">
            Quantum Entanglement in Deep Space Communications: <span className="text-primary glow-text">Phase I</span>
          </h1>

          <div className="flex flex-wrap items-center gap-8 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-primary font-bold">A</div>
              <span>Dr. Alistair Thorne</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Published May 05, 2026
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              1,284 Views
            </div>
          </div>
        </header>

        {/* Engagement & Actions Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center justify-between mb-12 sticky top-24 z-50 bg-[#020617]/80 backdrop-blur-xl">
          <div className="flex items-center gap-6 px-4">
            <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors group">
              <Heart className="w-5 h-5 group-hover:fill-red-400/20" />
              <span className="text-xs font-bold">452</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
              <MessageSquare className="w-5 h-5 group-hover:fill-primary/20" />
              <span className="text-xs font-bold">24</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Share</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {!isPremium || isUserPremium ? (
              <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform glow-border">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            ) : (
              <button className="bg-amber-400 text-amber-950 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
                <Lock className="w-4 h-4" />
                Unlock Full Paper
              </button>
            )}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-px bg-primary/30" />
                Abstract
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg italic">
                This paper explores the feasibility of using quantum entangled photons for near-instantaneous communication across interplanetary distances, overcoming the limitations of light-speed lag in orbital telemetry. We present Phase I results from the Orbital-01 Quantum Relay mission...
              </p>
            </section>

            <section className="space-y-8 relative">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-px bg-primary/30" />
                Technical Analysis
              </h2>
              
              <div className={`space-y-6 text-slate-400 leading-relaxed ${isPremium && !isUserPremium ? 'blur-xl select-none' : ''}`}>
                <p>
                  The synchronization of entanglement-based relay nodes requires a precision of 10^-15 seconds across distances exceeding 0.5 AU. Our findings suggest that localized gravitational anomalies around lunar bodies can be utilized to stabilize the photon flux...
                </p>
                <p>
                  Mathematical models derived from the Aether Experiment indicate that sub-light communication channels can be established with a 99.8% fidelity rate using the proposed Eka Quantum Grid.
                </p>
                <div className="aspect-video bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-slate-700" />
                </div>
              </div>

              {isPremium && !isUserPremium && (
                <div className="absolute inset-0 top-12 flex items-center justify-center bg-black/20 backdrop-blur-[2px] rounded-3xl">
                  <div className="glass-panel p-12 rounded-[3rem] border border-white/10 text-center max-w-sm">
                    <div className="p-4 bg-amber-400/20 rounded-2xl w-fit mx-auto mb-6 border border-amber-400/30">
                      <Lock className="text-amber-400 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 uppercase">Institutional Access</h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                      Detailed technical analysis, mathematical proofs, and datasets are restricted to verified researchers and premium members.
                    </p>
                    <Link 
                      href="/portal/verify" 
                      className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform glow-border"
                    >
                      Verify Academic ID
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-[2rem] border border-white/5 space-y-6">
              <h3 className="font-bold text-white text-lg">Citations</h3>
              <div className="space-y-4">
                <CitationItem title="Orbital Dynamics v4.2" author="ESA (2025)" />
                <CitationItem title="Quantum Flux Theory" author="Thorne et al. (2024)" />
                <CitationItem title="Mars Relay Protocols" author="Eka (2026)" />
              </div>
            </div>

            <div className="glass-panel p-8 rounded-[2rem] border border-white/5 space-y-6">
              <h3 className="font-bold text-white text-lg">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-500 uppercase">Quantum</span>
                <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-500 uppercase">Communication</span>
                <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-500 uppercase">Deep Space</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CitationItem({ title, author }: any) {
  return (
    <div className="flex items-start gap-3 group cursor-pointer">
      <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
        <FileText className="w-4 h-4 text-slate-500 group-hover:text-primary" />
      </div>
      <div>
        <div className="text-xs font-bold text-white leading-tight">{title}</div>
        <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{author}</div>
      </div>
    </div>
  );
}

import { 
  Barlow, Inter, Syncopate, Plus_Jakarta_Sans, Space_Grotesk, Sora,
  Rajdhani, Roboto, Bebas_Neue, Montserrat, Michroma, Exo_2,
  Outfit, Teko, Chivo, Lexend, Archivo_Black, Archivo
} from "next/font/google";

const f1_h = Barlow({ subsets: ["latin"], weight: "900" });
const f1_b = Inter({ subsets: ["latin"] });

const f2_h = Syncopate({ subsets: ["latin"], weight: "700" });
const f2_b = Plus_Jakarta_Sans({ subsets: ["latin"] });

const f3_h = Space_Grotesk({ subsets: ["latin"] });
const f3_b = Sora({ subsets: ["latin"] });

const f4_h = Rajdhani({ subsets: ["latin"], weight: "700" });
const f4_b = Roboto({ subsets: ["latin"], weight: "400" });

const f5_h = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const f5_b = Montserrat({ subsets: ["latin"] });

const f6_h = Michroma({ subsets: ["latin"], weight: "400" });
const f6_b = Exo_2({ subsets: ["latin"] });

const f7 = Outfit({ subsets: ["latin"] });

const f8_h = Teko({ subsets: ["latin"], weight: "700" });
const f8_b = Chivo({ subsets: ["latin"] });

const f9 = Lexend({ subsets: ["latin"] });

const f10_h = Archivo_Black({ subsets: ["latin"], weight: "400" });
const f10_b = Archivo({ subsets: ["latin"] });

export default function TypographyPlayground() {
  const options = [
    { id: "01", name: "SpaceX Industrial", head: f1_h, body: f1_b, desc: "Barlow + Inter" },
    { id: "02", name: "Premium High-End", head: f2_h, body: f2_b, desc: "Syncopate + Jakarta" },
    { id: "03", name: "Technical Future", head: f3_h, body: f3_b, desc: "Space Grotesk + Sora" },
    { id: "04", name: "Industrial Lab", head: f4_h, body: f4_b, desc: "Rajdhani + Roboto" },
    { id: "05", name: "Cinematic Impact", head: f5_h, body: f5_b, desc: "Bebas Neue + Montserrat" },
    { id: "06", name: "Classic Sci-Fi", head: f6_h, body: f6_b, desc: "Michroma + Exo 2" },
    { id: "07", name: "Modern Minimalist", head: f7, body: f7, desc: "Outfit (All Weights)" },
    { id: "08", name: "Command Center", head: f8_h, body: f8_b, desc: "Teko + Chivo" },
    { id: "09", name: "Clean Science", head: f9, body: f9, desc: "Lexend (All Weights)" },
    { id: "10", name: "Technical Manual", head: f10_h, body: f10_b, desc: "Archivo Black + Archivo" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center mb-20">
          <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Eka Typography Lab</h1>
          <p className="text-slate-500">Preview 10 professional font combinations for the Eka Command Center.</p>
        </header>

        <div className="space-y-8">
          {options.map((opt) => (
            <div key={opt.id} className="glass-panel p-8 rounded-[2rem] border border-white/5 bg-white/5 space-y-8 group hover:border-primary/30 transition-all">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Option {opt.id} // {opt.name}</span>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{opt.desc}</span>
              </div>
              
              {/* Navbar Preview */}
              <div className="flex items-center justify-between gap-12 bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full" />
                  <div className={`${opt.head.className} text-xl text-white uppercase tracking-tighter`}>Eka Aerospace</div>
                </div>
                
                <div className={`${opt.body.className} flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400`}>
                  <span className="hover:text-primary cursor-pointer transition-colors">Research</span>
                  <span className="hover:text-primary cursor-pointer transition-colors">Events</span>
                  <span className="hover:text-primary cursor-pointer transition-colors">Careers</span>
                  <span className="hover:text-primary cursor-pointer transition-colors">Shop</span>
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-[9px] font-black">Command Center</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

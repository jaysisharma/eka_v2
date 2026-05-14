import { Ticket, Calendar, MapPin, QrCode, Download } from "lucide-react";

export default function MyTickets() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Mission Tickets</h1>
        <p className="text-slate-500 mt-1">Access your registered events and digital boarding passes.</p>
      </header>

      <div className="max-w-2xl">
        <div className="glass-panel overflow-hidden rounded-[3rem] border border-white/5 bg-white/5 flex flex-col md:flex-row h-full group hover:border-primary/20 transition-all">
          {/* Info Side */}
          <div className="flex-1 p-10 space-y-8 border-b md:border-b-0 md:border-r border-dashed border-white/10">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-widest rounded-full">CONFIRMED</span>
              <h2 className="text-2xl font-black text-white uppercase leading-tight">Propulsion Symposium 2026</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Date</div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  June 12, 2026
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Location</div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  Oslo Headquarters
                </div>
              </div>
            </div>

            <button className="w-full py-4 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF Ticket
            </button>
          </div>

          {/* QR Side */}
          <div className="w-full md:w-64 bg-primary/5 flex flex-col items-center justify-center p-10 text-center">
            <div className="p-4 bg-white rounded-3xl mb-4 group-hover:scale-105 transition-transform duration-500">
              <QrCode className="w-32 h-32 text-black" />
            </div>
            <div className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">#EKA-TKT-1082</div>
          </div>
        </div>
      </div>
    </div>
  );
}

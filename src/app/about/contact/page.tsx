import { 
  Mail, 
  MapPin, 
  Phone,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  const offices = [
    {
      city: "Stockholm",
      role: "Main Office",
      address: "Kungsgatan 12, 111 35 Stockholm, Sweden",
      email: "stockholm@eka.org"
    },
    {
      city: "Oslo",
      role: "Operations",
      address: "Karl Johans gate 22, 0159 Oslo, Norway",
      email: "oslo@eka.org"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white font-jakarta selection:bg-primary selection:text-black">
      {/* Header */}
      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Get in Touch</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Contact Us
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              We are here to help with your questions about our research and products.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content - Simplified & Form on Right */}
      <section className="py-24">
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          
          {/* Offices on Left */}
          <div className="space-y-16 order-2 md:order-1">
            <div className="space-y-12">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Our Offices</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Where to find us</p>
              </div>

              <div className="space-y-12">
                {offices.map((office) => (
                  <div key={office.city} className="space-y-4">
                    <div className="flex items-center gap-3">
                       <h3 className="text-xl font-bold text-white">{office.city}</h3>
                       <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 border border-white/10 px-2 py-0.5 rounded-full">{office.role}</span>
                    </div>
                    <div className="space-y-3 text-sm text-slate-400 font-medium">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-0.5 text-slate-600" />
                        <p>{office.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-slate-600" />
                        <p>{office.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form on Right (Interactive Client Component) */}
          <div className="order-1 md:order-2">
            <ContactForm />
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Eka Aerospace • Stockholm & Oslo</p>
        </div>
      </footer>
    </main>
  );
}

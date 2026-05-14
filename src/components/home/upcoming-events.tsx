import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

export async function UpcomingEvents() {
  const events = await prisma.event.findMany({
    where: { date: { gte: new Date() } },
    take: 2,
    orderBy: { date: 'asc' }
  });

  return (
    <section className="py-32 bg-black/40 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#BA9F59]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BA9F59]">Talks & Meetings</span>
            </div>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Upcoming Events</h2>
          </div>
          <Link href="/events" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2 group">
             See Calendar
             <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event: any) => (
            <div key={event.id} className="group relative bg-white/[0.02] border border-white/10 flex flex-col md:flex-row overflow-hidden hover:bg-white/[0.05] transition-all">
              <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                <img
                  src={event.bannerUrl || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000"}
                  alt=""
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-8 space-y-6 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#BA9F59]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{format(event.date, 'MMM dd, yyyy')}</span>
                  </div>
                  <span className="bg-white/5 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-slate-500 rounded-full border border-white/5">
                    {event.type}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight">{event.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{event.description}</p>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{format(event.date, 'HH:mm')} UTC</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl opacity-50">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">No scheduled events at this time</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import prisma from "@/lib/prisma";
import { 
  Calendar, 
  Plus, 
  Users, 
  MapPin, 
  Trash2, 
  Edit3, 
  BarChart2,
  Search,
  Filter,
  Download,
  Ticket,
  ChevronRight,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

export default async function AdminEvents() {
  const events = await prisma.event.findMany({
    include: {
      _count: {
        select: { registrations: true }
      }
    },
    orderBy: { date: "desc" }
  });

  const totalAttendees = events.reduce((acc, curr) => acc + curr._count.registrations, 0);
  const totalCapacity = events.reduce((acc, curr) => acc + curr.seatCount, 0);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Institutional Events</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">Coordinate conferences, workshops, and global symposiums</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-slate-600 border border-slate-200 px-5 py-2.5 rounded-md text-sm font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="bg-[#0B1120] text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-lg shadow-slate-200 hover:bg-emerald-600 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Upcoming Missions" 
          value={events.filter(e => new Date(e.date) > new Date()).length.toString()} 
          icon={<Calendar className="w-5 h-5 text-indigo-500" />}
          color="bg-indigo-50"
        />
        <StatCard 
          label="Total Attendees" 
          value={totalAttendees.toLocaleString()} 
          icon={<Users className="w-5 h-5 text-emerald-500" />}
          color="bg-emerald-50"
        />
        <StatCard 
          label="Seat Utilization" 
          value={totalCapacity > 0 ? `${Math.round((totalAttendees / totalCapacity) * 100)}%` : "0%"} 
          icon={<Ticket className="w-5 h-5 text-amber-500" />}
          color="bg-amber-50"
        />
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search events by title or location..."
            className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-emerald-500/30 text-sm text-slate-600 rounded-md transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-md text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Event Identification</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Registration</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Calendar className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="text-sm font-semibold">No events scheduled in registry</p>
                    </div>
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500 shadow-sm border border-indigo-100">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">{event.title}</div>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                            <span>{new Date(event.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-40 space-y-1.5">
                          <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>{event._count.registrations} / {event.seatCount} Registered</span>
                            <span>{Math.round((event._count.registrations / event.seatCount) * 100)}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div 
                              className={`h-full transition-all duration-1000 ${
                                event._count.registrations >= event.seatCount ? 'bg-rose-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(100, (event._count.registrations / event.seatCount) * 100)}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                          new Date(event.date) < new Date() 
                            ? "bg-slate-50 text-slate-500 border-slate-200" 
                            : event._count.registrations >= event.seatCount
                            ? "bg-rose-50 text-rose-600 border-rose-100"
                            : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        }`}>
                          {new Date(event.date) < new Date() ? 'Archived' : event._count.registrations >= event.seatCount ? 'Full' : 'Active'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-md transition-all" title="View Analytics">
                          <BarChart2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-md transition-all" title="Edit Event">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all" title="Cancel/Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-4 ${color} rounded-md transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-800 leading-none">{value}</div>
          <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </div>
  );
}

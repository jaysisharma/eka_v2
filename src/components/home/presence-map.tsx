"use client";

import React from 'react';
import { MapPin } from 'lucide-react';

const LOCATIONS = [
  { name: 'Bangalore (HQ)', coords: [77.5946, 12.9716], type: 'Strategic Command' },
  { name: 'Houston', coords: [-95.3698, 29.7604], type: 'Orbital Ops' },
  { name: 'Tokyo', coords: [139.6503, 35.6762], type: 'Robotics Lab' },
  { name: 'Svalbard', coords: [15.6469, 78.2232], type: 'Deep Space Relay' },
  { name: 'Canberra', coords: [149.1287, -35.2809], type: 'Telemetry Node' },
];

export function GlobalPresenceMap() {
  // Simple lat/long to SVG mapping
  const project = (lng: number, lat: number) => {
    const x = ((lng + 180) * 800) / 360;
    const y = ((90 - lat) * 400) / 180;
    return { x, y };
  };

  return (
    <section className="py-32 bg-[#020617] overflow-hidden border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#BA9F59] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BA9F59]">Where We Work</span>
            </div>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Worldwide Offices</h2>
            <p className="text-slate-500 max-w-md text-sm font-medium">
              Eka has teams all over the world to make sure we are always connected to our ships in space.
            </p>
          </div>
          
          <div className="flex gap-12">
             <div className="text-right">
                <div className="text-2xl font-black text-white">05</div>
                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Main Hubs</div>
             </div>
             <div className="text-right">
                <div className="text-2xl font-black text-white">22</div>
                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Ground Stations</div>
             </div>
          </div>
        </div>

        <div className="relative aspect-[2/1] w-full bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden group">
          {/* Base Map Placeholder (SVG Path for simplified world map could go here, but using background for speed and clean look) */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-center bg-no-repeat bg-contain filter invert" />
          
          {/* SVG Map Layer */}
          <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full p-12">
             {/* Lines between nodes for "Network" feel */}
             {LOCATIONS.map((loc, i) => {
               if (i === 0) return null;
               const start = project(LOCATIONS[0].coords[0], LOCATIONS[0].coords[1]);
               const end = project(loc.coords[0], loc.coords[1]);
               return (
                 <line 
                   key={`line-${i}`}
                   x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                   stroke="#BA9F59" strokeWidth="0.5" strokeDasharray="4 4"
                   className="opacity-20"
                 />
               );
             })}

             {/* Connection Nodes */}
             {LOCATIONS.map((loc, i) => {
               const { x, y } = project(loc.coords[0], loc.coords[1]);
               return (
                 <g key={loc.name} className="cursor-help group/node">
                    <circle cx={x} cy={y} r="8" className="fill-[#BA9F59]/20 animate-ping" />
                    <circle cx={x} cy={y} r="3" className="fill-[#BA9F59]" />
                    
                    {/* Tooltip */}
                    <g className="opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none">
                      <rect x={x + 10} y={y - 20} width="120" height="40" fill="#0f172a" stroke="#BA9F59" strokeWidth="1" rx="4" />
                      <text x={x + 20} y={y - 5} fill="white" fontSize="10" fontWeight="bold" className="uppercase tracking-widest">{loc.name}</text>
                      <text x={x + 20} y={y + 10} fill="#BA9F59" fontSize="8" fontWeight="bold" className="uppercase tracking-widest">{loc.type}</text>
                    </g>
                 </g>
               );
             })}
          </svg>

          {/* Location List (Desktop Overlay) */}
          <div className="absolute bottom-8 right-8 space-y-2 hidden md:block">
            {LOCATIONS.map(loc => (
              <div key={loc.name} className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/5 rounded-full">
                <MapPin className="w-3 h-3 text-[#BA9F59]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">{loc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

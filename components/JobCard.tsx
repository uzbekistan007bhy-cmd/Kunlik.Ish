import React from 'react';
import { MapPin, Calendar, Clock, Bookmark, ShieldCheck, Star } from 'lucide-react';

interface JobCardProps {
  isUrgent?: boolean;
  title: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  salary: string;
  employer: string;
  rating: number;
}

export default function JobCard({ isUrgent, title, location, date, time, duration, salary, employer, rating }: JobCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-xl flex flex-col justify-between ${isUrgent ? 'border-red-200 bg-gradient-to-br from-white to-red-50/20' : 'border-slate-200'}`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
            {isUrgent ? '⚡ ZUDLIK BILAN' : 'YANGI'}
          </span>
          <button className="text-slate-400 hover:text-red-500"><Bookmark className="w-5 h-5" /></button>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
        <div className="space-y-2 text-sm text-slate-600 mb-5">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400 shrink-0" /><span>{location}</span></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /><span>{date}</span></div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /><span>{time} ({duration})</span></div>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">{employer.charAt(0)}</div>
          <div>
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">{employer}<ShieldCheck className="w-3.5 h-3.5 text-blue-600" /></div>
            <div className="text-[11px] text-slate-500 flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /><span>{rating}</span></div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Ish haqi</div>
          <div className="text-base font-extrabold text-slate-900">{salary}</div>
        </div>
      </div>
    </div>
  );
}

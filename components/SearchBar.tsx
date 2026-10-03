'use client';
import React, { useState } from 'react';
import { MapPin, Briefcase, Calendar, Search } from 'lucide-react';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <div className="w-full max-w-4xl bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
      <div className="flex items-center gap-3 px-4 py-3 sm:py-2 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200 sm:border-0">
        <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
        <div className="w-full">
          <div className="text-[10px] uppercase font-bold text-slate-400">Joylashuv</div>
          <input type="text" placeholder="Toshkent, Chilonzor" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 sm:py-2 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200 sm:border-0">
        <Briefcase className="w-5 h-5 text-blue-600 shrink-0" />
        <div className="w-full">
          <div className="text-[10px] uppercase font-bold text-slate-400">Kasb yoki ish</div>
          <input type="text" placeholder="Yuk tushirish, ofitsiant..." value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 sm:py-2 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200 sm:border-0">
        <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
        <div className="w-full">
          <div className="text-[10px] uppercase font-bold text-slate-400">Qachon</div>
          <select className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none cursor-pointer">
            <option>Bugun</option>
            <option>Ertaga</option>
            <option>Shu hafta</option>
          </select>
        </div>
      </div>
      <div>
        <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md">
          <Search className="w-5 h-5" />
          <span>Qidirish</span>
        </button>
      </div>
    </div>
  );
}

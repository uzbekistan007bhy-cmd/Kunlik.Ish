'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// --- SVG ICONS ---
const Rocket = () => (
  <svg className="w-7 h-7 text-indigo-400 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m-2.828 9.9a9 9 0 010-12.728M12 12h.01" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 0110 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0112 2z" />
  </svg>
);

const Search = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const MapPin = () => <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const Calendar = () => <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const Briefcase = () => <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const Star = () => <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const Clock = () => <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const User = () => <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const Lock = () => <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const Phone = () => <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const X = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;

// --- MOCK DATA ---
const urgentJobs = [
  {
    id: '1',
    isUrgent: true,
    title: 'Omborga yuklarni joylash va tushirish',
    location: 'Toshkent, Sergeli t.',
    date: 'Bugun',
    time: '09:00 – 18:00',
    salary: '220 000 so‘m',
    employer: 'Logistics Express',
    rating: 4.9
  },
  {
    id: '2',
    isUrgent: true,
    title: 'Supermarket kuryeri (Piyoda/Velosiped)',
    location: 'Toshkent, Yunusobod t.',
    date: 'Bugun',
    time: '12:00 – 21:00',
    salary: '250 000 so‘m',
    employer: 'Tezkor Dostavka',
    rating: 4.8
  }
];

const regularJobs = [
  {
    id: '3',
    title: 'Ofis binosini generalniy tozalash',
    location: 'Toshkent, M. Ulug‘bek t.',
    date: 'Ertaga',
    time: '08:00 – 15:00',
    salary: '180 000 so‘m',
    employer: 'Clean Service',
    rating: 4.8
  },
  {
    id: '4',
    title: 'Restoranga ofitsiant yordamchisi',
    location: 'Toshkent, Chilonzor t.',
    date: 'Bugun',
    time: '16:00 – 23:00',
    salary: '200 000 so‘m',
    employer: 'Grand Restaurant',
    rating: 4.9
  }
];

// --- AUTH MODAL ---
function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('register');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121624] border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl relative text-slate-200">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white"><X /></button>

        <div className="text-center mb-6">
          <h3 className="text-3xl font-black text-white tracking-wider flex items-center justify-center gap-2">
            1KUNLIK <span className="text-blue-500">🚀</span>
          </h3>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            {mode === 'register' ? 'Kunlik va qisqa muddatli ishlarni topish hamda professional darajada ishchi yollash platformasi.' : 'Hisobingizga kiring'}
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert("Muvaffaqiyatli!"); onClose(); }} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Ismingiz</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1a2035] border border-slate-700/60 focus-within:border-blue-500">
                <User />
                <input type="text" required placeholder="Ali Valiyev" className="w-full bg-transparent text-sm text-white focus:outline-none" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Telefon raqamingiz</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1a2035] border border-slate-700/60 focus-within:border-blue-500">
              <Phone />
              <input type="tel" required placeholder="+998 90 123 45 67" className="w-full bg-transparent text-sm text-white focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Parol</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1a2035] border border-slate-700/60 focus-within:border-blue-500">
              <Lock />
              <input type="password" required placeholder="••••••••" className="w-full bg-transparent text-sm text-white focus:outline-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 mt-4"
          >
            {mode === 'register' ? 'Ro‘yxatdan o‘tish' : 'Kirish'}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-slate-400">
          {mode === 'register' ? (
            <p>
              Akkauntingiz bormi?{' '}
              <button onClick={() => setMode('login')} className="font-bold text-blue-400 hover:underline ml-1">
                Kirish
              </button>
            </p>
          ) : (
            <p>
              Hali ro‘yxatdan o‘tmaganmisiz?{' '}
              <button onClick={() => setMode('register')} className="font-bold text-blue-400 hover:underline ml-1">
                Ro‘yxatdan o‘tish
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// --- MAIN HOMEPAGE ---
export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0e17] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#0d111d]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-white tracking-wider">1KUNLIK</span>
            <span className="text-2xl">🚀</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              Ro‘yxatdan o‘tish / Kirish
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (Rasmga aynan o'xshash karta) */}
      <section className="py-20 px-4 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-xl bg-[#121624] border border-slate-800/90 rounded-3xl p-10 text-center shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
          <h1 className="text-4xl font-black text-white tracking-wider flex items-center justify-center gap-3 mb-4">
            1KUNLIK <span className="text-3xl">🚀</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md mx-auto mb-8">
            Kunlik va qisqa muddatli ishlarni topish hamda professional darajada ishchi yollash platformasi.
          </p>

          <button
            onClick={() => setIsAuthOpen(true)}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-blue-600/40 transition-all active:scale-98"
          >
            Ro‘yxatdan o‘tish / Kirish
          </button>
        </div>

        {/* Qidiruv bo'limi */}
        <div className="w-full max-w-3xl mt-12 bg-[#121624] border border-slate-800 rounded-2xl p-3 grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-5 flex items-center gap-3 px-4 py-3 bg-[#1a2035] rounded-xl">
            <MapPin />
            <input type="text" placeholder="Joylashuv (masalan: Toshkent)" className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full" />
          </div>
          <div className="sm:col-span-5 flex items-center gap-3 px-4 py-3 bg-[#1a2035] rounded-xl">
            <Briefcase />
            <input type="text" placeholder="Qaysi kasb/ish kerak?" className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full" />
          </div>
          <div className="sm:col-span-2">
            <button className="w-full h-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1">
              <Search /> Qidirish
            </button>
          </div>
        </div>
      </section>

      {/* Ishlar ro'yxati */}
      <section className="max-w-5xl mx-auto px-4 pb-20 w-full">
        <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-blue-600 pl-3">So'nggi kunlik ishlar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...urgentJobs, ...regularJobs].map((job) => (
            <div key={job.id} className="bg-[#121624] border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-100">{job.title}</h3>
                <span className="text-blue-400 font-extrabold text-sm">{job.salary}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1"><MapPin /> {job.location}</span>
                <span className="flex items-center gap-1"><Calendar /> {job.date}</span>
                <span className="flex items-center gap-1"><Clock /> {job.time}</span>
              </div>
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="w-full py-2.5 bg-[#1a2035] hover:bg-blue-600 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all"
              >
                Arizani topshirish
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 bg-[#0d111d] text-center text-xs text-slate-500">
        <p>&copy; 2026 1KUNLIK platformasi. Barcha huquqlar himoyalangan.</p>
      </footer>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

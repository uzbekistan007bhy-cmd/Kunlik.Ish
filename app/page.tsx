'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// --- SVG ICONS ---
const Bell = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const Search = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const Menu = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>;
const User = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MapPin = () => <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const Calendar = () => <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const Briefcase = () => <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const Bookmark = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;
const ShieldCheck = () => <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const Star = () => <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const Clock = () => <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Lock = () => <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const X = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
const Phone = () => <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const ArrowRight = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;

// --- MOCK DATA ---
const urgentJobs = [
  {
    id: '1',
    isUrgent: true,
    title: 'Omborga yuklarni joylash va tushirish',
    location: 'Toshkent, Sergeli t.',
    date: 'Bugun',
    time: '09:00 – 18:00',
    duration: '9 soat',
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
    duration: '8 soat',
    salary: '250 000 so‘m',
    employer: 'Tezkor Dostavka',
    rating: 4.8
  }
];

const regularJobs = [
  {
    id: '3',
    isUrgent: false,
    title: 'Ofis binosini generalniy tozalash',
    location: 'Toshkent, M. Ulug‘bek t.',
    date: 'Ertaga',
    time: '08:00 – 15:00',
    duration: '7 soat',
    salary: '180 000 so‘m',
    employer: 'Clean Service',
    rating: 4.8
  },
  {
    id: '4',
    isUrgent: false,
    title: 'Restoranga ofitsiant yordamchisi',
    location: 'Toshkent, Chilonzor t.',
    date: 'Bugun',
    time: '16:00 – 23:00',
    duration: '7 soat',
    salary: '200 000 so‘m',
    employer: 'Grand Restaurant',
    rating: 4.9
  },
  {
    id: '5',
    isUrgent: false,
    title: 'Qurilish materiallarini tashish va saralash',
    location: 'Toshkent sh., Shayxontohur t.',
    date: 'Ertaga',
    time: '08:00 – 17:00',
    duration: '9 soat',
    salary: '280 000 so‘m',
    employer: 'Stroy Invest Group',
    rating: 4.7
  }
];

const categories = [
  { icon: '🏗️', name: 'Qurilish & Ta’mir', count: 142 },
  { icon: '🚚', name: 'Yuk tashish & Haydovchilik', count: 98 },
  { icon: '🧹', name: 'Tozalash & Xizmat', count: 75 },
  { icon: '🍽️', name: 'Restoran & Kafellar', count: 63 },
  { icon: '📦', name: 'Ombor & Logistika', count: 88 },
  { icon: '🛍️', name: 'Sotuv & Kuryerlik', count: 52 },
];

// --- AUTH MODAL ---
function AuthModal({ isOpen, onClose, initialMode = 'register' }: { isOpen: boolean; onClose: () => void; initialMode?: 'login' | 'register' }) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'worker' | 'employer'>('worker');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 transition-all">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
            1✓
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {mode === 'register' ? 'Ro‘yxatdan o‘tish' : 'Tizimga kirish'}
          </h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {mode === 'register' ? 'Kunlik ishlarni darhol toping yoki e’lon bering' : 'Hisobingizga kiring'}
          </p>
        </div>

        {mode === 'register' && (
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl mb-6">
            <button
              onClick={() => setRole('worker')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all ${role === 'worker' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Ish izlovchiman
            </button>
            <button
              onClick={() => setRole('employer')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all ${role === 'employer' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Ish beruvchiman
            </button>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); alert("Muvaffaqiyatli amalga oshirildi!"); onClose(); }} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Ism va Familiya</label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                <User />
                <input type="text" required placeholder="Ali Valiyev" className="w-full bg-transparent text-sm font-medium focus:outline-none text-slate-800" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Telefon raqam</label>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
              <Phone />
              <input type="tel" required placeholder="+998 90 123 45 67" className="w-full bg-transparent text-sm font-medium focus:outline-none text-slate-800" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Parol</label>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
              <Lock />
              <input type="password" required placeholder="••••••••" className="w-full bg-transparent text-sm font-medium focus:outline-none text-slate-800" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-600/25 transition-all mt-2 active:scale-[0.98]"
          >
            {mode === 'register' ? 'Davom etish' : 'Kirish'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-600 font-medium">
          {mode === 'register' ? (
            <p>
              Akkauntingiz bormi?{' '}
              <button onClick={() => setMode('login')} className="font-bold text-blue-600 hover:underline ml-1">
                Kirish
              </button>
            </p>
          ) : (
            <p>
              Hali ro‘yxatdan o‘tmaganmisiz?{' '}
              <button onClick={() => setMode('register')} className="font-bold text-blue-600 hover:underline ml-1">
                Ro‘yxatdan o‘tish
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// --- HEADER ---
function Header({ onOpenAuth }: { onOpenAuth: (mode: 'login' | 'register') => void }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            1✓
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
              1KUNLIK
            </span>
            <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase mt-1">Bugun ish. Bugun daromad.</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <span className="hover:text-blue-600 transition-colors cursor-pointer">Ish topish</span>
          <span className="hover:text-blue-600 transition-colors cursor-pointer">Yo‘nalishlar</span>
          <span onClick={() => onOpenAuth('register')} className="hover:text-blue-600 transition-colors cursor-pointer">E’lon berish</span>
          <span className="hover:text-blue-600 transition-colors cursor-pointer">Biz haqimizda</span>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => onOpenAuth('login')}
            className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors rounded-xl hover:bg-slate-50"
          >
            Kirish
          </button>
          <button 
            onClick={() => onOpenAuth('register')}
            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all active:scale-95"
          >
            Ro‘yxatdan o‘tish
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => onOpenAuth('register')} className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"><User /></button>
          <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"><Menu /></button>
        </div>
      </div>
    </header>
  );
}

// --- SEARCH BAR ---
function SearchBar() {
  return (
    <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/40 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
      <div className="sm:col-span-4 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus-within:bg-white focus-within:border-blue-500 transition-all">
        <MapPin />
        <div className="w-full text-left">
          <div className="text-[10px] uppercase font-bold text-slate-400">Joylashuv</div>
          <input type="text" placeholder="Toshkent, Chilonzor" className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none" />
        </div>
      </div>
      
      <div className="sm:col-span-4 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus-within:bg-white focus-within:border-blue-500 transition-all">
        <Briefcase />
        <div className="w-full text-left">
          <div className="text-[10px] uppercase font-bold text-slate-400">Qaysi ish?</div>
          <input type="text" placeholder="Yuk tushirish, Kuryer..." className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none" />
        </div>
      </div>

      <div className="sm:col-span-4">
        <button className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-blue-600/25 transition-all active:scale-[0.98]">
          <Search />
          <span>Ish topish</span>
        </button>
      </div>
    </div>
  );
}

// --- HERO SECTION ---
function Hero() {
  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/60 via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          O‘zbekistondagi №1 Kunlik Ishlar Portali
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl leading-[1.1] mb-6">
          Bugun ishlang. <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Bugun daromad oling!</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mb-12 leading-relaxed">
          Soha va joylashuvni tanlang, kunlik yoki soatlik ishlarga arizangizni birgina bosish orqali yuboring.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}

// --- JOB CARD ---
function JobCard({ isUrgent, title, location, date, time, duration, salary, employer, rating, onOpenAuth }: any) {
  return (
    <div className={`group bg-white rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between relative ${isUrgent ? 'border-red-200 shadow-xl shadow-red-500/5' : 'border-slate-100 shadow-xl shadow-slate-200/50'}`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[11px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider ${isUrgent ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
            {isUrgent ? '⚡ ZUDLIK BILAN' : 'YANGI'}
          </span>
          <button className="text-slate-300 hover:text-red-500 transition-colors p-1"><Bookmark /></button>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-2">{title}</h3>

        <div className="space-y-2.5 text-xs font-semibold text-slate-500 mb-6 bg-slate-50/70 p-3.5 rounded-2xl">
          <div className="flex items-center gap-2"><MapPin /><span className="text-slate-700">{location}</span></div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5"><Calendar /><span className="text-slate-700">{date}</span></div>
            <div className="flex items-center gap-1.5"><Clock /><span className="text-slate-700">{time} ({duration})</span></div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">{employer.charAt(0)}</div>
          <div>
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1">{employer}<ShieldCheck /></div>
            <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1"><Star /><span>{rating}</span></div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase font-extrabold text-slate-400">Ish haqi</div>
          <button 
            onClick={() => onOpenAuth('register')}
            className="text-base font-black text-blue-600 hover:text-blue-700 transition-colors"
          >
            {salary}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- CATEGORY CARD ---
function CategoryCard({ icon, name, count }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 shadow-xl shadow-slate-100/80 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex items-center gap-4 cursor-pointer group">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-600 text-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-inner">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{name}</h4>
        <p className="text-xs font-semibold text-slate-400 mt-1">{count} ta aktiv e’lon</p>
      </div>
    </div>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xl flex items-center justify-center">1✓</div>
            <span className="text-2xl font-black text-white tracking-tight">1KUNLIK</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">“Bugun ish. Bugun daromad.” Har bir O‘zbekiston fuqarosi uchun tezkor va halol kunlik ishlar tarmog‘i.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">Ish izlovchilar</h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li className="hover:text-white transition-colors cursor-pointer">Barcha vakansiyalar</li>
            <li className="hover:text-white transition-colors cursor-pointer">Kategoriyalar</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">Ish beruvchilar</h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li className="hover:text-white transition-colors cursor-pointer">E’lon joylashtirish</li>
            <li className="hover:text-white transition-colors cursor-pointer">Xizmat ko‘rsatish qoidalari</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">Bog‘lanish</h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li className="hover:text-white transition-colors cursor-pointer">Qo‘llab-quvvatlash boti</li>
            <li className="hover:text-white transition-colors cursor-pointer">Telegram kanalimiz</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex justify-between text-xs font-medium text-slate-500">
        <p>&copy; 2026 1KUNLIK platformasi. Barcha huquqlar himoyalangan.</p>
        <p>O‘zbekiston bo‘ylab 🇺🇿</p>
      </div>
    </footer>
  );
}

// --- MAIN HOMEPAGE ---
export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      <Header onOpenAuth={handleOpenAuth} />
      <Hero />
      
      {/* Urgent Jobs Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">⚡ Shoshilinch e’lonlar</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Darhol ishchi kerak bo‘lgan eng yuqori to‘lanadigan ishlar</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {urgentJobs.map((job) => (<JobCard key={job.id} {...job} onOpenAuth={handleOpenAuth} />))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Ommabop Yo‘nalishlar</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">O‘zingizga qulay va mos sohaga oid ishlarni tanlang</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, idx) => (<CategoryCard key={idx} {...cat} />))}
          </div>
        </div>
      </section>

      {/* Regular Jobs Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Barcha kunlik ishlar</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Platformadagi eng so‘nggi qo‘shilgan kunlik e’lonlar</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regularJobs.map((job) => (<JobCard key={job.id} {...job} onOpenAuth={handleOpenAuth} />))}
        </div>
      </section>

      <Footer />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
}

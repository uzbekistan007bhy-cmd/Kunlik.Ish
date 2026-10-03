import React from 'react';
import Link from 'next/link';
import { Bell, Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            1✓
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            1KUNLIK
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <span className="hover:text-blue-600 cursor-pointer">Ish topish</span>
          <span className="hover:text-blue-600 cursor-pointer">Kategoriyalar</span>
          <span className="hover:text-blue-600 cursor-pointer">Ish berish</span>
          <span className="hover:text-blue-600 cursor-pointer">Qanday ishlaydi?</span>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          <span className="px-4 py-2.5 text-sm font-semibold text-slate-700 cursor-pointer hover:text-blue-600">Kirish</span>
          <span className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 cursor-pointer">Ro‘yxatdan o‘tish</span>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"><Search className="w-6 h-6" /></button>
          <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"><Menu className="w-6 h-6" /></button>
        </div>
      </div>
    </header>
  );
}

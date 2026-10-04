'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthModal from './AuthModal';
import { UZ_LOCATIONS } from '@/lib/locations';

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  // Viloyat va Tuman tanlovlari State-i
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const currentDistricts = UZ_LOCATIONS.find((r) => r.name === selectedRegion)?.districts || [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0b0e17]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo va E'lon berish tugmasi */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-black text-white tracking-wider flex items-center gap-1">
              1KUNLIK <span className="text-lg">🚀</span>
            </Link>

            <Link
              href="/admin/bulk-upload"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-500/20"
            >
              <span>+</span> E'lon joylash
            </Link>
          </div>

          {/* O'zbekiston Viloyat va Tumanlari bo'yicha Qidiruv */}
          <div className="flex-1 max-w-xl flex items-center gap-2 bg-[#121624] border border-slate-700/60 p-1.5 rounded-2xl">
            {/* Viloyat */}
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedDistrict('');
              }}
              className="bg-transparent text-xs text-white px-2 py-1.5 outline-none w-1/2 cursor-pointer"
            >
              <option value="" className="bg-[#121624] text-slate-300">Barcha Viloyatlar</option>
              {UZ_LOCATIONS.map((loc, idx) => (
                <option key={idx} value={loc.name} className="bg-[#121624] text-white">
                  {loc.name}
                </option>
              ))}
            </select>

            <div className="w-[1px] h-6 bg-slate-700"></div>

            {/* Tuman / Shahar */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedRegion}
              className="bg-transparent text-xs text-white px-2 py-1.5 outline-none w-1/2 cursor-pointer disabled:opacity-40"
            >
              <option value="" className="bg-[#121624] text-slate-300">Barcha Tumanlar</option>
              {currentDistricts.map((dist, idx) => (
                <option key={idx} value={dist} className="bg-[#121624] text-white">
                  {dist}
                </option>
              ))}
            </select>

            <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
              Qidirish
            </button>
          </div>

          {/* O'NG TARAFI: Foydalanuvchi Profili yoki Kirish tugmasi */}
          <div className="flex items-center gap-3">
            {user ? (
              /* Ekran chetidagi Foydalanuvchi Profili */
              <div className="flex items-center gap-3 bg-[#161b2e] border border-slate-700/80 px-3 py-1.5 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                  <p className="text-[10px] text-slate-400">{user.phone}</p>
                </div>
                <button
                  onClick={() => setUser(null)}
                  className="text-slate-400 hover:text-red-400 text-xs ml-1"
                  title="Chiqish"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold px-4 py-2.5 rounded-xl transition"
              >
                Ro‘yxatdan o‘tish / Kirish
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(userData) => setUser(userData)}
      />
    </>
  );
}

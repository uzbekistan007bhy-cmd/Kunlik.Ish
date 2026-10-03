import React from 'react';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          O‘zbekistondagi №1 Kunlik Ishlar Platformasi
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-[1.15] mb-6">
          Bugun ish. <br className="hidden sm:inline" />
          <span className="text-blue-600">Bugun daromad.</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Bir kunlik, soatlik va qisqa muddatli ishlarni tez toping yoki kerakli ishchini bir kunda toping.
        </p>
        <SearchBar />
      </div>
    </section>
  );
}

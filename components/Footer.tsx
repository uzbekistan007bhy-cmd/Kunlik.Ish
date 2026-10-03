import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">1✓</div>
            <span className="text-xl font-extrabold text-white">1KUNLIK</span>
          </div>
          <p className="text-sm text-slate-400">“Bugun ish. Bugun daromad.” O‘zbekistondagi bir kunlik ishlar platformasi.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase">Ish izlovchilar</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="hover:text-white cursor-pointer">Ish topish</li>
            <li className="hover:text-white cursor-pointer">Kategoriyalar</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase">Ish beruvchilar</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="hover:text-white cursor-pointer">Eʼlon joylashtirish</li>
            <li className="hover:text-white cursor-pointer">Tariflar</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase">Yordam</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Aloqa</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex justify-between text-xs">
        <p>&copy; 2026 1KUNLIK. Barcha huquqlar himoyalangan.</p>
        <p>O‘zbekiston uchun 🇺🇿</p>
      </div>
    </footer>
  );
}

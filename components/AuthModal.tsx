'use client';

import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; phone: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // 1. ISM: Raqam va maxsus belgilarni klaviaturadan bosganda ham UMMAN kirgizmaydi
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Faqat lotin va krill harflari hamda bo'sh joy
    const filteredValue = value.replace(/[^a-zA-Z'’`ʻа-яА-Я\s]/g, '');
    setName(filteredValue);
    setErrorMsg('');
  };

  // 2. TELEFON: Harf va ortiqcha belgilarni UMMAN kirgizmaydi (faqat raqam va +)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Faqat + va raqamlar
    const filteredValue = value.replace(/[^0-9+]/g, '');
    
    // Har doim +998 bilan boshlanishini ta'minlash
    if (!filteredValue.startsWith('+998')) {
      setPhone('+998 ');
    } else {
      setPhone(filteredValue);
    }
    setErrorMsg('');
  };

  // 3. FORMA YUBORILGANDA QAT'IY TEKSHIRUV
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Brauzer standart alertlarini to'xtatish
    setErrorMsg('');

    // --- ISM TEKSHIRUVI ---
    const cleanName = name.trim();
    if (cleanName.length < 2) {
      setErrorMsg("Ismingizni to'liq kiriting (kamida 2 ta harf)!");
      return;
    }
    if (/\d/.test(cleanName)) {
      setErrorMsg("Ismda raqam ishlatish mumkin emas!");
      return;
    }

    // --- TELEFON TEKSHIRUVI ---
    const rawDigits = phone.replace(/\D/g, ''); // Faqat raqamlar
    if (rawDigits.length !== 12) {
      setErrorMsg("Telefon raqami to'liq kiritilmadi (+998 va 9 ta raqam bo'lishi shart)!");
      return;
    }

    // --- PAROL TEKSHIRUVI ---
    if (password.length < 8) {
      setErrorMsg("Parol kamida 8 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMsg("Parolda kamida 1 ta KATTA harf (A-Z) bo'lishi shart!");
      return;
    }

    // Agar barcha shartlar bajarilsa:
    onSuccess({ name: cleanName, phone: phone.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#121624] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black text-white text-center mb-1">Ro‘yxatdan o‘tish 🚀</h2>
        <p className="text-slate-400 text-xs text-center mb-6">Ma'lumotlarni to'g'ri shaklda kiriting</p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-xs font-bold text-center animate-pulse">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ISMINGIZ */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Ismingiz <span className="text-red-400">(Faqat harflar)</span>
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: Ali Valiyev"
              value={name}
              onChange={handleNameChange}
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* TELEFON RAQAMINGIZ */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Telefon raqamingiz <span className="text-red-400">(Faqat raqam)</span>
            </label>
            <input
              type="text"
              required
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* PAROL */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Parol <span className="text-red-400">(Min 8 belgi va 1 Katta harf)</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg('');
              }}
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-lg shadow-blue-600/30"
          >
            Ro‘yxatdan o‘tish
          </button>
        </form>
      </div>
    </div>
  );
}

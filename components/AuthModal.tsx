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

  // Ism kiritish (Raqam kiritishni umuman o'tkazmaydi)
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Faqat harflar va bo'sh joyga ruxsat
    if (/^[a-zA-Z'’`ʻа-яА-Я\s]*$/.test(val)) {
      setName(val);
      setErrorMsg('');
    }
  };

  // Telefon kiritish (Faqat raqamlar va + ishorasi)
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\+?[0-9\s]*$/.test(val)) {
      setPhone(val);
      setErrorMsg('');
    }
  };

  // Forma yuborilayotganda qat'iy tekshirish
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Ism tekshiruvi (Kamida 2 ta harf)
    if (name.trim().length < 2) {
      setErrorMsg("Ismingizni to'liq kiritishingiz shart (raqam ishlatib bo'lmaydi)!");
      return;
    }

    // 2. Telefon raqam tekshiruvi (+998 va kamida 9 ta raqam)
    const cleanPhone = phone.replace(/\D/g, ''); // Faqat raqamlarni ajratib olish
    if (cleanPhone.length < 12) {
      setErrorMsg("Telefon raqamini to'liq kiriting (masalan: +998 90 123 45 67)!");
      return;
    }

    // 3. Parol tekshiruvi (Kamida 8 belgi hamda 1 ta KATTA harf)
    if (password.length < 8) {
      setErrorMsg("Parol kamida 8 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMsg("Parolda kamida 1 ta katta harf (masalan: A, B, C...) bo'lishi shart!");
      return;
    }

    // Barcha shartlar bajarilganda:
    onSuccess({ name, phone });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#121624] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black text-white text-center mb-1">Ro‘yxatdan o‘tish 🚀</h2>
        <p className="text-slate-400 text-xs text-center mb-6">Ma'lumotlaringizni to'g'ri shaklda kiriting</p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ISMINGIZ */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ismingiz (Faqat harflar)</label>
            <input
              type="text"
              required
              placeholder="Ali Valiyev"
              value={name}
              onChange={handleNameInput}
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* TELEFON RAQAMINGIZ */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Telefon raqamingiz (Faqat raqamlar)</label>
            <input
              type="text"
              required
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={handlePhoneInput}
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* PAROL */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Parol (Min: 8 belgi + 1 Katta harf)
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

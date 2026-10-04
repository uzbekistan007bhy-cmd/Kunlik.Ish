'use client';

import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; phone: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // 1. ISM: Raqam kiritishni UMMAN ilojisi yo'q (bossa ham ekranga tushmaydi)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Har qanday raqamni darhol o'chirib tashlaydi
    const cleanVal = val.replace(/[0-9]/g, '');
    setName(cleanVal);
    setErrorMsg('');
  };

  // 2. TELEFON: Harf kiritishni UMMAN ilojisi yo'q (faqat raqam va +)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Har qanday harfni darhol o'chirib tashlaydi
    const cleanVal = val.replace(/[^0-9+]/g, '');
    setPhone(cleanVal);
    setErrorMsg('');
  };

  // 3. TUGMA BOSILGANDA QAT'IY TEKSHIRUV
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMsg('');

    // Ism tekshiruvi
    if (name.trim().length < 2) {
      setErrorMsg("Ism kamida 2 ta harfdan iborat bo'lishi kerak!");
      return;
    }

    // Telefon raqam tekshiruvi (+998 va 9 ta raqam = 12 ta belgi)
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== 12) {
      setErrorMsg("Telefon raqami to'liq emas! (Masalan: +998901234567)");
      return;
    }

    // Parol tekshiruvi (Kamida 8 belgi va 1 Katta harf)
    if (password.length < 8) {
      setErrorMsg("Parol kamida 8 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMsg("Parolda kamida 1 ta KATTA harf (A-Z) bo'lishi shart!");
      return;
    }

    // Muvaffaqiyatli bo'lsa (alert o'rniga):
    onSuccess({ name: name.trim(), phone: phone.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#121624] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black text-white text-center mb-1">Ro‘yxatdan o‘tish 🚀</h2>
        <p className="text-slate-400 text-xs text-center mb-6">Ma'lumotlarni to'g'ri shaklda kiriting</p>

        {/* XATOLIK CHIQADIGAN JOI */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              ISMINGIZ <span className="text-red-400">(Faqat harflar)</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="Ali Valiyev"
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              TELEFON RAQAMINGIZ <span className="text-red-400">(Faqat raqam)</span>
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+998901234567"
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              PAROL <span className="text-red-400">(Min 8 belgi, 1 Katta harf)</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg('');
              }}
              placeholder="••••••••"
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

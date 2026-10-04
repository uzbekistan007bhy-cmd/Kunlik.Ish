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
  const [errors, setErrors] = useState<{ name?: string; phone?: string; password?: string }>({});

  if (!isOpen) return null;

  // Ism validatsiyasi (Raqam kiritishni taqiqlash)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z'’`ʻа-яА-Я\s]*$/.test(value)) {
      setName(value);
      setErrors((prev) => ({ ...prev, name: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, name: 'Ismda raqam yoki maxsus belgilar bo‘lishi mumkin emas!' }));
    }
  };

  // Telefon validatsiyasi (Harf kiritishni taqiqlash)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\+?[0-9\s]*$/.test(value)) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, phone: 'Telefon raqamga faqat raqamlar kiritiladi!' }));
    }
  };

  // Parol tekshiruvi (Kamida 8 belgi, 1 ta katta harf)
  const validatePassword = (val: string) => {
    setPassword(val);
    if (val.length < 8) {
      setErrors((prev) => ({ ...prev, password: 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak!' }));
    } else if (!/[A-Z]/.test(val)) {
      setErrors((prev) => ({ ...prev, password: 'Parolda kamida 1 ta katta harf (A-Z) bo‘lishi shart!' }));
    } else {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      setErrors((prev) => ({ ...prev, name: 'Ismingizni to‘liq kiriting!' }));
      return;
    }
    if (phone.replace(/\s/g, '').length < 12) {
      setErrors((prev) => ({ ...prev, phone: 'To‘liq telefon raqamni kiriting!' }));
      return;
    }
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      setErrors((prev) => ({ ...prev, password: 'Parol talabga javob bermaydi!' }));
      return;
    }

    // Ro'yxatdan o'tish muvaffaqiyatli
    onSuccess({ name, phone });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#121624] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black text-white text-center mb-1">Ro‘yxatdan o‘tish 🚀</h2>
        <p className="text-slate-400 text-xs text-center mb-6">1KUNLIK platformasidan to‘liq foydalanish uchun tizimga kiring</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ism familiya */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ism va Familiya</label>
            <input
              type="text"
              required
              placeholder="Masalan: Ali Valiyev"
              value={name}
              onChange={handleNameChange}
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
          </div>

          {/* Telefon raqam */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Telefon raqam</label>
            <input
              type="text"
              required
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
          </div>

          {/* Parol */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Parol (Min: 8 belgi, 1 ta Katta harf)</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
              className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-400 text-[11px] mt-1">{errors.password}</p>}
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

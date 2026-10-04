'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// O'zbekiston viloyat va tumanlari ro'yxati
const UZ_LOCATIONS = [
  {
    name: 'Toshkent shahri',
    districts: ['Chilonzor', 'Yunusobod', 'Mirzo Ulugbek', 'Yakkasaroy', 'Yashnobod', 'Shayxontohur', 'Mirobod', 'Uchtepa', 'Sergeli', 'Yangihayot', 'Bektemir', 'Olmazor'],
  },
  {
    name: 'Toshkent viloyati',
    districts: ['Olmaliq sh.', 'Angren sh.', 'Chirchiq sh.', 'Yangiyo‘l sh.', 'Oqqurg‘on t.', 'Bo‘stonliq t.', 'Bo‘ka t.', 'Zangiota t.', 'Qibray t.', 'Parkent t.', 'Pskent t.', 'Toshkent t.', 'Chinoz t.', 'Yuqorichirchiq t.', 'Yangiyo‘l t.'],
  },
  {
    name: 'Samarqand viloyati',
    districts: ['Samarqand sh.', 'Kattaqo‘rg‘on sh.', 'Bulung‘ur t.', 'Jomboy t.', 'Ishtixon t.', 'Kattaqo‘rg‘on t.', 'Narpay t.', 'Nurobod t.', 'Oqdaryo t.', 'Paxtachi t.', 'Payariq t.', 'Pastdarg‘om t.', 'Samarqand t.', 'Toyloq t.'],
  },
  {
    name: 'Andijon viloyati',
    districts: ['Andijon sh.', 'Xonobod sh.', 'Andijon t.', 'Asaka t.', 'Baliqchi t.', 'Buloqboshi t.', 'Bo‘ston t.', 'Jalaquduq t.', 'Izboskan t.', 'Marhamat t.', 'Paxtaobod t.', 'Ulug‘nor t.', 'Xo‘jaobod t.', 'Shahrixon t.'],
  },
  {
    name: 'Farg‘ona viloyati',
    districts: ['Farg‘ona sh.', 'Marg‘ilon sh.', 'Qo‘qon sh.', 'Quvasoy sh.', 'Beshariq t.', 'Bog‘dod t.', 'Buvayda t.', 'Dang‘ara t.', 'Yozyovon t.', 'Quva t.', 'Qoshtepa t.', 'Oltiariq t.', 'Rishton t.', 'Sox t.', 'Toshloq t.', 'Uchko‘prik t.', 'Farg‘ona t.', 'O‘zbekiston t.'],
  },
  {
    name: 'Namangan viloyati',
    districts: ['Namangan sh.', 'Kosonsoy t.', 'Mingbuloq t.', 'Namangan t.', 'Norin t.', 'Pop t.', 'To‘raqo‘rg‘on t.', 'Uychi t.', 'Uchqo‘rg‘on t.', 'Chortoq t.', 'Chust t.', 'Yangiqo‘rg‘on t.'],
  },
  {
    name: 'Buxoro viloyati',
    districts: ['Buxoro sh.', 'Kogon sh.', 'Olot t.', 'Buxoro t.', 'Vobkent t.', 'G‘ijduvon t.', 'Jondor t.', 'Kogon t.', 'Qorako‘l t.', 'Qorovulbozor t.', 'Peshku t.', 'Romitan t.', 'Shofirkon t.'],
  },
  {
    name: 'Xorazm viloyati',
    districts: ['Urganch sh.', 'Xiva sh.', 'Bog‘ot t.', 'Gurlan t.', 'Qushko‘pir t.', 'Shovot t.', 'Tuproqqal’a t.', 'Urganch t.', 'Xazorasp t.', 'Xonqa t.', 'Xiva t.', 'Yangiariq t.', 'Yangibozor t.'],
  },
  {
    name: 'Qashqadaryo viloyati',
    districts: ['Qarshi sh.', 'Shahrisabz sh.', 'Dehqonobod t.', 'Kasbi t.', 'Kitob t.', 'Koson t.', 'Mirishkor t.', 'Muborak t.', 'Nishon t.', 'Qarshi t.', 'Chiroqchi t.', 'Shahrisabz t.', 'Yakkabog‘ t.', 'Ko‘kdala t.'],
  },
  {
    name: 'Surxondaryo viloyati',
    districts: ['Termiz sh.', 'Angor t.', 'Bandixon t.', 'Boysun t.', 'Denov t.', 'Jarkurg‘on t.', 'Qiziriq t.', 'Qumqo‘rg‘on t.', 'Muzrobot t.', 'Sariosiyo t.', 'Termiz t.', 'Uzun t.', 'Sherobod t.', 'Shorchi t.'],
  },
  {
    name: 'Navoiy viloyati',
    districts: ['Navoiy sh.', 'Zarafshon sh.', 'Konimex t.', 'Karmana t.', 'Qiziltepa t.', 'Xatirchi t.', 'Navbahor t.', 'Nurota t.', 'Tomdi t.', 'Uchkuduk t.'],
  },
  {
    name: 'Jizzax viloyati',
    districts: ['Jizzax sh.', 'Arnasoy t.', 'Baxmal t.', 'G‘allaorol t.', 'Do‘stlik t.', 'Sh.Rashidov t.', 'Zarbdor t.', 'Zafarobod t.', 'Zomin t.', 'Mirzacho‘l t.', 'Paxtakor t.', 'Forish t.', 'Yangiobod t.'],
  },
  {
    name: 'Qoraqalpog‘iston Respublikasi',
    districts: ['Nukus sh.', 'Amudaryo t.', 'Beruniy t.', 'Qorao‘zak t.', 'Kegeyli t.', 'Qo‘ng‘irot t.', 'Qonliko‘l t.', 'Mo‘ynoq t.', 'Nukus t.', 'Taqiyotosh t.', 'Taxtako‘pir t.', 'To‘rtko‘l t.', 'Xo‘jayli t.', 'Chimboy t.', 'Shumanay t.', 'Elikqala t.'],
  },
];

export default function HomePage() {
  // Auth state-lari
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  // Form input state-lari
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Qidiruv va Filter state-lari
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const currentDistricts = UZ_LOCATIONS.find((r) => r.name === selectedRegion)?.districts || [];

  // Forma topshirilganda
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'register') {
      // 1. Ism tekshiruvi (Raqam kiritish taqiqlanadi)
      if (/\d/.test(name)) {
        setErrorMsg("Ismda raqamlar bo'lishi mumkin emas!");
        return;
      }
      if (name.trim().length < 2) {
        setErrorMsg("Ism kamida 2 ta harfdan iborat bo'lishi kerak!");
        return;
      }

      // 2. Telefon tekshiruvi (Harf kiritish taqiqlanadi, to'liq format)
      const digitsOnly = phone.replace(/\D/g, '');
      if (digitsOnly.length !== 12) {
        setErrorMsg("Telefon raqam to'liq emas! (Masalan: +998901234567)");
        return;
      }
    }

    // 3. Parol tekshiruvi (Kamida 8 belgi hamda 1 Katta harf)
    if (password.length < 8) {
      setErrorMsg("Parol kamida 8 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMsg("Parolda kamida 1 ta KATTA harf (A-Z) bo'lishi shart!");
      return;
    }

    // Muvaffaqiyatli saqlash
    setUser({
      name: name.trim() || 'Foydalanuvchi',
      phone: phone.trim(),
    });
    setIsAuthOpen(false);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white flex flex-col font-sans">
      {/* SHAPKA (HEADER) */}
      <header className="sticky top-0 z-40 bg-[#0b0e17]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo va E'lon berish tugmasi */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-black tracking-wider flex items-center gap-1.5 text-white">
              1KUNLIK <span className="text-lg">🚀</span>
            </Link>

            <Link
              href="/admin/bulk-upload"
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-500/20"
            >
              <span>+</span> E'lon joylash
            </Link>
          </div>

          {/* O'ZGARTIRILGAN QIDIRUV VA REGION FILTERI */}
          <div className="flex-1 max-w-xl flex items-center gap-2 bg-[#121624] border border-slate-700/60 p-1.5 rounded-2xl">
            <input
              type="text"
              placeholder="Qanday ish izlayapsiz?..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/3 bg-transparent text-xs text-white px-2 py-1 outline-none placeholder-slate-500"
            />

            <div className="w-[1px] h-5 bg-slate-700"></div>

            {/* Viloyat */}
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedDistrict('');
              }}
              className="bg-transparent text-xs text-slate-200 px-1 py-1 outline-none w-1/3 cursor-pointer"
            >
              <option value="" className="bg-[#121624] text-slate-400">Barcha Viloyatlar</option>
              {UZ_LOCATIONS.map((loc, idx) => (
                <option key={idx} value={loc.name} className="bg-[#121624] text-white">
                  {loc.name}
                </option>
              ))}
            </select>

            <div className="w-[1px] h-5 bg-slate-700"></div>

            {/* Tuman / Shahar */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedRegion}
              className="bg-transparent text-xs text-slate-200 px-1 py-1 outline-none w-1/3 cursor-pointer disabled:opacity-40"
            >
              <option value="" className="bg-[#121624] text-slate-400">Barcha Tumanlar</option>
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

          {/* EKRAN CHETIDA FOYDALANUVCHI PROFILI */}
          <div>
            {user ? (
              <div className="flex items-center gap-2.5 bg-[#161b2e] border border-slate-700/80 px-3 py-1.5 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow-inner">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                  <p className="text-[10px] text-slate-400">{user.phone}</p>
                </div>
                <button
                  onClick={() => setUser(null)}
                  className="text-slate-400 hover:text-red-400 text-xs ml-1 transition"
                  title="Chiqish"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('register');
                  setErrorMsg('');
                  setIsAuthOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20"
              >
                Ro‘yxatdan o‘tish
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ASOSIY MAZMUN (HERO SECTION) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          ⚡️ O'zbekistondagi eng tezkor kunlik ishlar platformasi
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl leading-tight mb-6">
          Kunlik va qisqa muddatli <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">ishlarni toping</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mb-8">
          Viloyat va tumanlar bo'yicha filterlang, o'zingizga mos e'lonlarni qidiring hamda bir necha daqiqada yangi e'lon joylang!
        </p>
      </main>

      {/* RO'YXATDAN O'TISH & KIRISH MODALI */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#121624] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black text-white text-center mb-1">
              {authMode === 'register' ? "Ro‘yxatdan o‘tish 🚀" : "Tizimga kirish 🔑"}
            </h2>
            <p className="text-slate-400 text-xs text-center mb-6">
              Kunlik ishlarni topish hamda professional darajada ishchi yollash platformasi
            </p>

            {/* QIZIL XATOLIK XABARI (ALERT O'RNIGA) */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-xs font-bold text-center animate-pulse">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ISMINGIZ (FAQT HARFLAR) */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                    Ismingiz <span className="text-red-400">(Faqat harflar)</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ali Valiyev"
                    value={name}
                    onChange={(e) => {
                      // Raqamlarni joyida o'chirib tashlaydi
                      setName(e.target.value.replace(/[0-9]/g, ''));
                      setErrorMsg('');
                    }}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* TELEFON RAQAMINGIZ (FAQAT RAQAM) */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                    Telefon raqamingiz <span className="text-red-400">(Faqat raqam)</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+998901234567"
                    value={phone}
                    onChange={(e) => {
                      // Harflarni joyida o'chirib tashlaydi
                      setPhone(e.target.value.replace(/[^0-9+]/g, ''));
                      setErrorMsg('');
                    }}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

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
                {authMode === 'register' ? "Ro‘yxatdan o‘tish" : "Kirish"}
              </button>
            </form>

            {/* REJIMNI O'ZGARTIRISH */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'register' ? 'login' : 'register');
                  setErrorMsg('');
                }}
                className="text-xs text-slate-400 hover:text-blue-400 transition"
              >
                {authMode === 'register'
                  ? 'Akkauntingiz bormi? Kirish'
                  : "Akkauntingiz yo'qmi? Ro'yxatdan o'tish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

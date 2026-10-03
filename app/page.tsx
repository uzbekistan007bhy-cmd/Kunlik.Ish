'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, Search, Menu, User, MapPin, Calendar, Briefcase, 
  Bookmark, ShieldCheck, Star, Clock, Lock, X, Phone 
} from 'lucide-react';

// --- MOCK DATA ---
const urgentJobs = [
  {
    id: '1',
    isUrgent: true,
    title: 'Omborga yuklarni joylash va tushirish',
    location: 'Toshkent, Sergeli tumani',
    date: 'Bugun',
    time: '09:00 – 18:00',
    duration: '9 soat',
    salary: '180 000 so‘m',
    employer: 'Logistics Group',
    rating: 4.9
  },
  {
    id: '2',
    isUrgent: true,
    title: 'Supermarket uchun kuryer (Piyoda/Velosiped)',
    location: 'Toshkent, Yunusobod tumani',
    date: 'Bugun',
    time: '12:00 – 21:00',
    duration: '8 soat',
    salary: '200 000 so‘m',
    employer: 'Tezkor Dostavka',
    rating: 4.7
  }
];

const regularJobs = [
  {
    id: '3',
    badge: 'YANGI',
    isUrgent: false,
    title: 'Ofis binosini generalniy tozalash',
    location: 'Toshkent, Mirzo Ulug‘bek t.',
    date: 'Ertalab',
    time: '08:00 – 15:00',
    duration: '7 soat',
    salary: '150 000 so‘m',
    employer: 'Clean Service',
    rating: 4.8
  },
  {
    id: '4',
    badge: 'YANGI',
    isUrgent: false,
    title: 'Mehmonxonaga ofitsiant yordamchisi',
    location: 'Toshkent, Chilonzor t.',
    date: 'Bugun',
    time: '16:00 – 23:00',
    duration: '7 soat',
    salary: '220 000 so‘m',
    employer: 'Grand Hotel',
    rating: 4.9
  },
  {
    id: '5',
    badge: 'YANGI',
    isUrgent: false,
    title: 'Qurilish materiallarini tashish',
    location: 'Toshkent sh., Shayxontohur t.',
    date: 'Ertaga',
    time: '08:00 – 17:00',
    duration: '9 soat',
    salary: '250 000 so‘m',
    employer: 'Stroy Invest',
    rating: 4.6
  }
];

const categories = [
  { icon: '🏗', name: 'Qurilish', count: 128 },
  { icon: '🚚', name: 'Yuk tashish', count: 84 },
  { icon: '🧹', name: 'Tozalash', count: 63 },
  { icon: '🍽', name: 'Ofitsiant', count: 41 },
  { icon: '📦', name: 'Ombor', count: 57 },
  { icon: '🚗', name: 'Haydovchilik', count: 36 },
];

// --- AUTH MODAL COMPONENT ---
function AuthModal({ isOpen, onClose, initialMode = 'register' }: { isOpen: boolean; onClose: () => void; initialMode?: 'login' | 'register' }) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'worker' | 'employer'>('worker');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-600 text-white font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-600/20">
            1✓
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {mode === 'register' ? 'Ro‘yxatdan o‘tish' : 'Tizimga kirish'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {mode === 'register' ? '1KUNLIK platformasiga xush kelibsiz!' : 'Akkauntingizga kiring'}
          </p>
        </div>

        {mode === 'register' && (
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl mb-6">
            <button
              onClick={() => setRole('worker')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${role === 'worker' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Ish izlovchiman
            </button>
            <button
              onClick={() => setRole('employer')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${role === 'employer' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Ish beruvchiman
            </button>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); alert("Muvaffaqiyatli bajarildi!"); onClose(); }} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Ism va Familiya</label>
              <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-slate-200 focus-within:border-blue-600 transition-colors">
                <User className="w-5 h-5 text-slate-400" />
                <input type="text" required placeholder="Ali Valiyev" className="w-full bg-transparent text-sm focus:outline-none" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Telefon raqam</label>
            <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-slate-200 focus-within:border-blue-600 transition-colors">
              <Phone className="w-5 h-5 text-slate-400" />
              <input type="tel" required placeholder="+998 90 123 45 67" className="w-full bg-transparent text-sm focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Parol</label>
            <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-slate-200 focus-within:border-blue-600 transition-colors">
              <Lock className="w-5 h-5 text-slate-400" />
              <input type="password" required placeholder="••••••••" className="w-full bg-transparent text-sm focus:outline-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all mt-2"
          >
            {mode === 'register' ? 'Davom etish' : 'Kirish'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-600">
          {mode === 'register' ? (
            <p>
              Akkauntingiz bormi?{' '}
              <button onClick={() => setMode('login')} className="font-bold text-blue-600 hover:underline">
                Kirish
              </button>
            </p>
          ) : (
            <p>
              Hali ro‘yxatdan o‘tmaganmisiz?{' '}
              <button onClick={() => setMode('register')} className="font-bold text-blue-600 hover:underline">
                Ro‘yxatdan o‘tish
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// --- MAIN COMPONENTS ---
function Header({ onOpenAuth }: { onOpenAuth: (mode: 'login' | 'register') => void }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
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
          <span onClick={() => onOpenAuth('register')} className="hover:text-blue-600 cursor-pointer">Ish berish</span>
          <span className="hover:text-blue-600 cursor-pointer">Qanday ishlaydi?</span>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          <button 
            onClick={() => onOpenAuth('login')}
            className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Kirish
          </button>
          <button 
            onClick={() => onOpenAuth('register')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all"
          >
            Ro‘yxatdan o‘tish
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"><Search className="w-6 h-6" /></button>
          <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"><Menu className="w-6 h-6" /></button>
        </div>
      </div>
    </header>
  );
}

function SearchBar() {
  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <div className="w-full max-w-4xl bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
      <div className="flex items-center gap-3 px-4 py-3 sm:py-2 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200 sm:border-0">
        <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
        <div className="w-full">
          <div className="text-[10px] uppercase font-bold text-slate-400">Joylashuv</div>
          <input type="text" placeholder="Toshkent, Chilonzor" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 sm:py-2 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200 sm:border-0">
        <Briefcase className="w-5 h-5 text-blue-600 shrink-0" />
        <div className="w-full">
          <div className="text-[10px] uppercase font-bold text-slate-400">Kasb yoki ish</div>
          <input type="text" placeholder="Yuk tushirish, ofitsiant..." value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 sm:py-2 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200 sm:border-0">
        <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
        <div className="w-full">
          <div className="text-[10px] uppercase font-bold text-slate-400">Qachon</div>
          <select className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none cursor-pointer">
            <option>Bugun</option>
            <option>Ertaga</option>
            <option>Shu hafta</option>
          </select>
        </div>
      </div>
      <div>
        <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md">
          <Search className="w-5 h-5" />
          <span>Qidirish</span>
        </button>
      </div>
    </div>
  );
}

function Hero() {
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

function JobCard({ isUrgent, title, location, date, time, duration, salary, employer, rating, onOpenAuth }: any) {
  return (
    <div className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-xl flex flex-col justify-between ${isUrgent ? 'border-red-200 bg-gradient-to-br from-white to-red-50/20' : 'border-slate-200'}`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
            {isUrgent ? '⚡ ZUDLIK BILAN' : 'YANGI'}
          </span>
          <button className="text-slate-400 hover:text-red-500"><Bookmark className="w-5 h-5" /></button>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
        <div className="space-y-2 text-sm text-slate-600 mb-5">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400 shrink-0" /><span>{location}</span></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /><span>{date}</span></div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /><span>{time} ({duration})</span></div>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">{employer.charAt(0)}</div>
          <div>
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">{employer}<ShieldCheck className="w-3.5 h-3.5 text-blue-600" /></div>
            <div className="text-[11px] text-slate-500 flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /><span>{rating}</span></div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Ish haqi</div>
          <button 
            onClick={() => onOpenAuth('register')}
            className="text-base font-extrabold text-blue-600 hover:underline"
          >
            {salary}
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ icon, name, count }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all flex items-center gap-4 cursor-pointer group">
      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{name}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{count} ta ish mavjud</p>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Ishni toping', desc: 'O‘zingizga qulay hudud va vaqtdagi ishni tanlang.' },
    { num: '02', title: 'Ariza yuboring', desc: 'Birgina tugma orqali ish beruvchiga nomzodingizni yuboring.' },
    { num: '03', title: 'Ishni bajaring', desc: 'Belgilangan vaqtda kelib, vazifani sifatli bajaring.' },
    { num: '04', title: 'Daromad oling', desc: 'Ish tugagach, pulingizni darhol oling.' },
  ];
  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">1KUNLIK qanday ishlaydi?</h2>
          <p className="text-slate-600 text-lg">Atigi 4 qadamda daromadga ega bo‘ling.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
              <span className="text-4xl font-black text-blue-600/20 absolute top-4 right-4">{step.num}</span>
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center mb-4">{idx + 1}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
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

// --- MAIN PAGE EXPORT ---
export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onOpenAuth={handleOpenAuth} />
      <Hero />
      
      {/* Urgent Jobs */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">⚡ Zudlik bilan ishchi kerak</h2>
            <p className="text-sm text-slate-500 mt-1">Hozirning o‘zida ish boshlaydigan shoshilinch eʼlonlar</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {urgentJobs.map((job) => (<JobCard key={job.id} {...job} onOpenAuth={handleOpenAuth} />))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Ishni yo‘nalish bo‘yicha toping</h2>
            <p className="text-sm text-slate-500 mt-1">O‘zingizga qiziqarli sohani tanlang</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, idx) => (<CategoryCard key={idx} {...cat} />))}
          </div>
        </div>
      </section>

      {/* Regular Jobs */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Bugungi ishlar lentasi</h2>
          <p className="text-sm text-slate-500 mt-1">Bugun mavjud bo‘lgan eng yangi imkoniyatlar</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regularJobs.map((job) => (<JobCard key={job.id} {...job} onOpenAuth={handleOpenAuth} />))}
        </div>
      </section>

      <HowItWorks />
      <Footer />

      {/* Modal oyna */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
}

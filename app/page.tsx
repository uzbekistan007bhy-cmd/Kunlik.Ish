'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// -------------------------------------------------------------
// 1. O'ZBEKISTON HUDUDLARI RO'YXATI
// -------------------------------------------------------------
const UZ_LOCATIONS = [
  {
    name: 'Toshkent shahri',
    districts: ['Chilonzor', 'Yunusobod', 'Mirzo Ulug‘bek', 'Yakkasaroy', 'Yashnobod', 'Shayxontohur', 'Mirobod', 'Uchtepa', 'Sergeli', 'Yangihayot', 'Bektemir', 'Olmazor'],
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

// -------------------------------------------------------------
// 2. TYPES
// -------------------------------------------------------------
interface User {
  phone: string;
  name: string;
  password: string;
  balance: number; // Admin uchun Infinity
  isAdmin?: boolean;
}

interface Job {
  id: string;
  title: string;
  description: string;
  price: string;
  region: string;
  district: string;
  phone: string;
  authorPhone: string;
  createdAt: string;
}

interface PaymentTransaction {
  id: string;
  userPhone: string;
  userName: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  cardLastDigits: string;
}

export default function HomePage() {
  // -------------------------------------------------------------
  // DATABASE IN-MEMORY STATE
  // -------------------------------------------------------------
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([
    { phone: '+998901234567', name: 'Admin', password: 'Password123', balance: Infinity, isAdmin: true },
    { phone: '+998919876543', name: 'Ali Valiyev', password: 'Userpass1', balance: 15000, isAdmin: false }
  ]);

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Usta yordamchisi kerak (Gisht va qum tashish)',
      description: 'Yangi uy qurilishida materiallarni tashishga 2 ta baquvvat yigit kerak. Tushlik va choy ta’minlanadi.',
      price: '250 000 so‘m/kun',
      region: 'Toshkent shahri',
      district: 'Chilonzor',
      phone: '+998901234567',
      authorPhone: '+998901234567',
      createdAt: 'Bugun, 10:30'
    },
    {
      id: '2',
      title: 'Kafe uchun tajribali idish yuvuvchi',
      description: 'Soat 18:00 dan 23:00 gacha ishlaydigan chaqqon ayol yoki qiz kerak. Yo‘lkira to‘lanadi.',
      price: '120 000 so‘m/kun',
      region: 'Samarqand viloyati',
      district: 'Samarqand sh.',
      phone: '+998919876543',
      authorPhone: '+998919876543',
      createdAt: 'Kecha, 18:15'
    }
  ]);

  // Admin Sozlamalari
  const [adminCardNumber, setAdminCardNumber] = useState('8600 1234 5678 9012');
  const [adminCardHolder, setAdminCardHolder] = useState('ALIXON VALIYEV');
  const [jobPostingPrice, setJobPostingPrice] = useState(5000); // Admin tomonidan o'zgartiriladigan e'lon narxi

  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    { id: 'TX101', userPhone: '+998919876543', userName: 'Ali Valiyev', amount: 20000, status: 'approved', date: '2026-10-04 12:00', cardLastDigits: '4455' }
  ]);

  // -------------------------------------------------------------
  // APP STATES
  // -------------------------------------------------------------
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modallar
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [verificationStep, setVerificationStep] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [inputCode, setInputCode] = useState('');

  // Form (Auth)
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('+998');
  const [formPassword, setFormPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Filtrlar
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Modals for Actions
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Forms
  const [newJob, setNewJob] = useState({ title: '', description: '', price: '', region: '', district: '', phone: '' });
  const [depositAmount, setDepositAmount] = useState('10000');
  const [depositCardLastDigits, setDepositCardLastDigits] = useState('');

  // Admin Sozlamalari Temp State
  const [tempAdminCard, setTempAdminCard] = useState(adminCardNumber);
  const [tempAdminCardHolder, setTempAdminCardHolder] = useState(adminCardHolder);
  const [tempJobPrice, setTempJobPrice] = useState(jobPostingPrice.toString());

  const currentDistricts = useMemo(() => {
    return UZ_LOCATIONS.find((r) => r.name === selectedRegion)?.districts || [];
  }, [selectedRegion]);

  const newJobDistricts = useMemo(() => {
    return UZ_LOCATIONS.find((r) => r.name === newJob.region)?.districts || [];
  }, [newJob.region]);

  // E'lonlarni filtrlash
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchQuery =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRegion = selectedRegion ? job.region === selectedRegion : true;
      const matchDistrict = selectedDistrict ? job.district === selectedDistrict : true;

      return matchQuery && matchRegion && matchDistrict;
    });
  }, [jobs, searchQuery, selectedRegion, selectedDistrict]);

  // -------------------------------------------------------------
  // AUTH LOGIC
  // -------------------------------------------------------------
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'login') {
      const user = registeredUsers.find((u) => u.phone === formPhone.trim());
      if (!user) {
        setErrorMsg("Bunday telefon raqam ro'yxatdan o'tmagan!");
        return;
      }
      if (user.password !== formPassword) {
        setErrorMsg("Parol noto'g'ri kiritildi!");
        return;
      }
      setCurrentUser(user);
      setIsAuthOpen(false);
      resetAuthForms();
    } else {
      if (!verificationStep) {
        if (/\d/.test(formName)) {
          setErrorMsg("Ismingizda raqamlar bo'lishi mumkin emas!");
          return;
        }
        if (formName.trim().length < 2) {
          setErrorMsg("Ism kamida 2 ta harfdan iborat bo'lishi kerak!");
          return;
        }
        const digitsOnly = formPhone.replace(/\D/g, '');
        if (digitsOnly.length !== 12) {
          setErrorMsg("Telefon raqami to'liq emas! (+998XXXXXXXXX)");
          return;
        }
        const existingUser = registeredUsers.find((u) => u.phone === formPhone.trim());
        if (existingUser) {
          setErrorMsg("Ushbu telefon raqami allaqachon ro'yxatdan o'tgan!");
          return;
        }
        if (formPassword.length < 8) {
          setErrorMsg("Parol kamida 8 ta belgidan iborat bo'lishi kerak!");
          return;
        }
        if (!/[A-Z]/.test(formPassword)) {
          setErrorMsg("Parolda kamida 1 ta KATTA harf (A-Z) bo'lishi shart!");
          return;
        }

        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedCode(code);
        setVerificationStep(true);
      } else {
        if (inputCode !== generatedCode) {
          setErrorMsg("Tasdiqlash kodi noto'g'ri!");
          return;
        }

        const newUser: User = {
          phone: formPhone.trim(),
          name: formName.trim(),
          password: formPassword,
          balance: 0,
          isAdmin: false
        };

        setRegisteredUsers([...registeredUsers, newUser]);
        setCurrentUser(newUser);
        setIsAuthOpen(false);
        resetAuthForms();
      }
    }
  };

  const resetAuthForms = () => {
    setFormName('');
    setFormPhone('+998');
    setFormPassword('');
    setErrorMsg('');
    setVerificationStep(false);
    setInputCode('');
    setGeneratedCode('');
  };

  // -------------------------------------------------------------
  // E'LON JOYLASH (PULLIK VA ADMIN UCHUN CHEKSIZ)
  // -------------------------------------------------------------
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    // Admin bo'lmasa balansi tekshiriladi
    if (!currentUser.isAdmin && currentUser.balance < jobPostingPrice) {
      alert(`Hisobingizda yetarli mablag' yo'q! Hozirgi e'lon joylash narxi: ${jobPostingPrice.toLocaleString()} so'm.`);
      setIsDepositOpen(true);
      return;
    }

    // Agar oddiy foydalanuvchi bo'lsa, balansidan yechiladi
    if (!currentUser.isAdmin) {
      const updatedUsers = registeredUsers.map((u) => {
        if (u.phone === currentUser.phone) {
          return { ...u, balance: u.balance - jobPostingPrice };
        }
        return u;
      });
      setRegisteredUsers(updatedUsers);
      const updatedCurrent = updatedUsers.find((u) => u.phone === currentUser.phone) || null;
      setCurrentUser(updatedCurrent);
    }

    const createdJob: Job = {
      id: Date.now().toString(),
      title: newJob.title,
      description: newJob.description,
      price: newJob.price,
      region: newJob.region,
      district: newJob.district,
      phone: newJob.phone,
      authorPhone: currentUser.phone,
      createdAt: 'Hozirgina'
    };

    setJobs([createdJob, ...jobs]);
    setIsPostJobOpen(false);
    setNewJob({ title: '', description: '', price: '', region: '', district: '', phone: '' });
    alert("E'loningiz muvaffaqiyatli joylandi!");
  };

  // -------------------------------------------------------------
  // HISOBNI TO'LDIRISH
  // -------------------------------------------------------------
  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const amountNum = parseInt(depositAmount);
    if (isNaN(amountNum) || amountNum < 1000) {
      alert("Eng kam to'lov summasi 1 000 so'm");
      return;
    }

    if (depositCardLastDigits.length !== 4) {
      alert("Kartangiz oxirgi 4 ta raqamini kiriting!");
      return;
    }

    const newTx: PaymentTransaction = {
      id: 'TX' + Math.floor(100 + Math.random() * 900),
      userPhone: currentUser.phone,
      userName: currentUser.name,
      amount: amountNum,
      status: 'pending',
      date: new Date().toLocaleString('uz-UZ'),
      cardLastDigits: depositCardLastDigits
    };

    setTransactions([newTx, ...transactions]);
    setIsDepositOpen(false);
    setDepositCardLastDigits('');
    alert("To'lov so'rovi yuborildi! Admin to'lovni tasdiqlagach, pul hisobingizga tushadi.");
  };

  // -------------------------------------------------------------
  // ADMIN PANEL LOGIKASI
  // -------------------------------------------------------------
  const handleApproveTransaction = (txId: string) => {
    const tx = transactions.find((t) => t.id === txId);
    if (!tx || tx.status !== 'pending') return;

    setTransactions(transactions.map((t) => (t.id === txId ? { ...t, status: 'approved' as const } : t)));

    // Foydalanuvchiga pul qo'shiladi
    const updatedUsers = registeredUsers.map((u) => {
      if (u.phone === tx.userPhone) {
        return { ...u, balance: u.balance + tx.amount };
      }
      return u;
    });

    setRegisteredUsers(updatedUsers);

    if (currentUser && currentUser.phone === tx.userPhone) {
      setCurrentUser({ ...currentUser, balance: currentUser.balance + tx.amount });
    }
  };

  const handleRejectTransaction = (txId: string) => {
    setTransactions(transactions.map((t) => (t.id === txId ? { ...t, status: 'rejected' as const } : t)));
  };

  const handleSaveAdminSettings = () => {
    const parsedPrice = parseInt(tempJobPrice);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      alert("E'lon narxini to'g'ri kiriting!");
      return;
    }
    setAdminCardNumber(tempAdminCard);
    setAdminCardHolder(tempAdminCardHolder);
    setJobPostingPrice(parsedPrice);
    alert("Admin sozlamalari muvaffaqiyatli saqlandi!");
  };

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white flex flex-col font-sans">
      {/* -------------------------------------------------------------
          HEADER
      ------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#0b0e17]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-black tracking-wider flex items-center gap-1.5 text-white">
              1KUNLIK <span className="text-lg">🚀</span>
            </Link>

            <button
              onClick={() => {
                if (!currentUser) setIsAuthOpen(true);
                else setIsPostJobOpen(true);
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-500/20"
            >
              <span>+</span> E'lon joylash ({jobPostingPrice.toLocaleString()} so'm)
            </button>
          </div>

          {/* FILTRLAR */}
          <div className="flex-1 max-w-xl flex items-center gap-2 bg-[#121624] border border-slate-700/60 p-1.5 rounded-2xl">
            <input
              type="text"
              placeholder="Qanday ish izlayapsiz?..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/3 bg-transparent text-xs text-white px-2 py-1 outline-none placeholder-slate-500"
            />
            <div className="w-[1px] h-5 bg-slate-700"></div>
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
          </div>

          {/* PROFIL / ADMIN PANEL */}
          <div className="flex items-center gap-3">
            {currentUser?.isAdmin && (
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                className="bg-red-600/20 border border-red-500/50 hover:bg-red-600/30 text-red-400 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1"
              >
                🛠 Admin Panel
              </button>
            )}

            {currentUser ? (
              <div className="flex items-center gap-3">
                <div
                  onClick={() => !currentUser.isAdmin && setIsDepositOpen(true)}
                  className="cursor-pointer bg-[#161b2e] border border-blue-500/40 hover:border-blue-500 px-3 py-1.5 rounded-2xl flex items-center gap-2 transition"
                  title={currentUser.isAdmin ? "Admin Balansi Cheksiz" : "Hisobni to'ldirish"}
                >
                  <span className="text-xs text-slate-400">Balans:</span>
                  <span className="text-xs font-black text-green-400">
                    {currentUser.isAdmin ? '∞ Cheksiz' : `${currentUser.balance.toLocaleString()} so'm`}
                  </span>
                  {!currentUser.isAdmin && (
                    <span className="bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">+</span>
                  )}
                </div>

                <div className="flex items-center gap-2 bg-[#161b2e] border border-slate-700/80 px-3 py-1.5 rounded-2xl">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-inner">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-white leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400">{currentUser.phone}</p>
                  </div>
                  <button
                    onClick={() => setCurrentUser(null)}
                    className="text-slate-400 hover:text-red-400 text-xs ml-1 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20"
              >
                Kirish / Ro'yxatdan o'tish
              </button>
            )}
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------
          MAIN CONTENT
      ------------------------------------------------------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-[#121624] border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Barcha e'lonlar va ish o'rinlari 💼
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              O'zingizga mos ishni izlang yoki bir necha daqiqada yangi ish e'lonini joylang!
            </p>
          </div>
          {(selectedRegion || selectedDistrict || searchQuery) && (
            <button
              onClick={() => {
                setSelectedRegion('');
                setSelectedDistrict('');
                setSearchQuery('');
              }}
              className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-xl text-slate-300 transition"
            >
              🔄 Filtrlarni tozalash
            </button>
          )}
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#121624] border border-slate-800 hover:border-slate-700 rounded-3xl p-5 flex flex-col justify-between transition duration-200 shadow-lg hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-xl">
                      📍 {job.region}, {job.district}
                    </span>
                    <span className="text-[10px] text-slate-500">{job.createdAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{job.title}</h3>
                  <p className="text-slate-400 text-xs mb-4 line-clamp-3 leading-relaxed">{job.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Ish haqi</span>
                    <span className="text-sm font-black text-green-400">{job.price}</span>
                  </div>
                  <a
                    href={`tel:${job.phone}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                  >
                    📞 Bog'lanish
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#121624]/60 border border-slate-800/80 rounded-3xl p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/60 rounded-full flex items-center justify-center text-3xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ushbu filtr bo'yicha hech qanday ish topilmadi</h3>
            <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
              Siz qidirgan viloyat yoki tumanda hozircha faol e'lonlar mavjud emas. Filtrlarni o'zgartirib ko'ring yoki birinchi bo'lib e'lon joylang!
            </p>
            <button
              onClick={() => {
                setSelectedRegion('');
                setSelectedDistrict('');
                setSearchQuery('');
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
            >
              Barcha e'lonlarni ko'rish
            </button>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------
          AUTH MODAL
      ------------------------------------------------------------- */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#121624] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => {
                setIsAuthOpen(false);
                resetAuthForms();
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black text-white text-center mb-1">
              {verificationStep ? 'Tasdiqlash kodi 📲' : authMode === 'register' ? 'Ro‘yxatdan o‘tish 🚀' : 'Tizimga kirish 🔑'}
            </h2>
            <p className="text-slate-400 text-xs text-center mb-6">
              {verificationStep ? `${formPhone} raqamiga yuborilgan 4 xonali kodni kiriting` : "Ma'lumotlaringizni kiriting"}
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-xs font-bold text-center">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {verificationStep ? (
                <div>
                  <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
                    <p className="text-[11px] text-blue-300 font-semibold mb-1">[SIMULYATSIYA] Kod:</p>
                    <span className="text-xl font-black tracking-widest text-white">{generatedCode}</span>
                  </div>
                  <input
                    type="text"
                    maxLength={4}
                    required
                    placeholder="1234"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-center text-lg tracking-widest font-bold text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <>
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ismingiz</label>
                      <input
                        type="text"
                        required
                        placeholder="Ali Valiyev"
                        value={formName}
                        onChange={(e) => {
                          setFormName(e.target.value.replace(/[0-9]/g, ''));
                          setErrorMsg('');
                        }}
                        className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Telefon raqam</label>
                    <input
                      type="text"
                      required
                      placeholder="+998901234567"
                      value={formPhone}
                      onChange={(e) => {
                        setFormPhone(e.target.value.replace(/[^0-9+]/g, ''));
                        setErrorMsg('');
                      }}
                      className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Parol</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formPassword}
                      onChange={(e) => {
                        setFormPassword(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-lg shadow-blue-600/30"
              >
                {verificationStep ? 'Tasdiqlash va Kirish' : authMode === 'register' ? 'Kodni Yuborish 📲' : 'Kirish'}
              </button>
            </form>

            {!verificationStep && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'register' ? 'login' : 'register');
                    setErrorMsg('');
                  }}
                  className="text-xs text-slate-400 hover:text-blue-400 transition"
                >
                  {authMode === 'register' ? 'Akkauntingiz bormi? Kirish' : "Akkauntingiz yo'qmi? Ro'yxatdan o'tish"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          PULLIK E'LON JOYLASH MODALI
      ------------------------------------------------------------- */}
      {isPostJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#121624] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPostJobOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-black text-white text-center mb-1">Yangi ish e'lonini joylash 📢</h2>
            <p className="text-slate-400 text-xs text-center mb-6">
              E'lon joylash narxi: <span className="text-green-400 font-bold">{currentUser?.isAdmin ? "BEPUL (Admin)" : `${jobPostingPrice.toLocaleString()} so'm`}</span>
            </p>

            <form onSubmit={handlePostJob} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Sarlavha</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Meva omboriga yuk ortuvchi kerak"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Tavsif</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ish vaqti, vazifasi va sharoitlar..."
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Viloyat</label>
                  <select
                    required
                    value={newJob.region}
                    onChange={(e) => setNewJob({ ...newJob, region: e.target.value, district: '' })}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Tanlang</option>
                    {UZ_LOCATIONS.map((loc, idx) => (
                      <option key={idx} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Tuman</label>
                  <select
                    required
                    disabled={!newJob.region}
                    value={newJob.district}
                    onChange={(e) => setNewJob({ ...newJob, district: e.target.value })}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-40"
                  >
                    <option value="">Tanlang</option>
                    {newJobDistricts.map((dist, idx) => (
                      <option key={idx} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ish haqi</label>
                  <input
                    type="text"
                    required
                    placeholder="200 000 so'm/kun"
                    value={newJob.price}
                    onChange={(e) => setNewJob({ ...newJob, price: e.target.value })}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Telefon</label>
                  <input
                    type="text"
                    required
                    placeholder="+998901234567"
                    value={newJob.phone}
                    onChange={(e) => setNewJob({ ...newJob, phone: e.target.value })}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-lg shadow-blue-600/30"
              >
                E'lonni Chop Etish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          HISOBNI TO'LDIRISH MODALI
      ------------------------------------------------------------- */}
      {isDepositOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#121624] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setIsDepositOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-black text-white text-center mb-1">Hisobni to'ldirish 💳</h2>
            <p className="text-slate-400 text-xs text-center mb-6">Admin kartasiga o'tkazma qiling</p>

            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 border border-blue-400/30 text-white shadow-xl relative overflow-hidden">
              <p className="text-[10px] font-bold text-blue-200 uppercase mb-2">Rasmiy Admin Kartasi</p>
              <p className="text-lg font-black tracking-widest mb-3 font-mono">{adminCardNumber}</p>
              <p className="text-xs font-semibold text-blue-100">{adminCardHolder}</p>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">To'lov summasi (so'm)</label>
                <input
                  type="number"
                  required
                  min={1000}
                  step={1000}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Kartangiz oxirgi 4 xonasi</label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  placeholder="8899"
                  value={depositCardLastDigits}
                  onChange={(e) => setDepositCardLastDigits(e.target.value)}
                  className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono tracking-widest"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition shadow-lg shadow-green-600/30"
              >
                To'lov qilindi deb xabar berish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          ADMIN PANEL MODALI (FAQAT ADMIN)
      ------------------------------------------------------------- */}
      {isAdminPanelOpen && currentUser?.isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-[#121624] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAdminPanelOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black text-white text-center mb-1">🛠 Admin Boshqaruv Paneli</h2>
            <p className="text-slate-400 text-xs text-center mb-6">Sayt narxlari, kartasi va statistikasi</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* SOZLAMALAR: KARTA VA E'LON NARXI */}
              <div className="bg-[#1a2035] border border-slate-700/60 p-4 rounded-2xl md:col-span-1 space-y-3">
                <h3 className="text-sm font-bold text-white mb-2">⚙️ Sayt Sozlamalari</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">Admin Karta Raqami</label>
                  <input
                    type="text"
                    value={tempAdminCard}
                    onChange={(e) => setTempAdminCard(e.target.value)}
                    className="w-full bg-[#121624] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">Karta Egasi</label>
                  <input
                    type="text"
                    value={tempAdminCardHolder}
                    onChange={(e) => setTempAdminCardHolder(e.target.value)}
                    className="w-full bg-[#121624] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">E'lon Narxi (so'm)</label>
                  <input
                    type="number"
                    value={tempJobPrice}
                    onChange={(e) => setTempJobPrice(e.target.value)}
                    className="w-full bg-[#121624] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  />
                </div>

                <button
                  onClick={handleSaveAdminSettings}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition"
                >
                  Sozlamalarni Saqlash
                </button>
              </div>

              {/* STATISTIKA */}
              <div className="bg-[#1a2035] border border-slate-700/60 p-4 rounded-2xl md:col-span-2 flex flex-col justify-between">
                <h3 className="text-sm font-bold text-white mb-3">📊 Moliyaviy va Sayt Statistika</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-[#121624] rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">Foydalanuvchilar</span>
                    <span className="text-base font-black text-white">{registeredUsers.length}</span>
                  </div>
                  <div className="p-3 bg-[#121624] rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">E'lonlar</span>
                    <span className="text-base font-black text-blue-400">{jobs.length}</span>
                  </div>
                  <div className="p-3 bg-[#121624] rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">Admin Balansi</span>
                    <span className="text-base font-black text-green-400">∞ Cheksiz</span>
                  </div>
                  <div className="p-3 bg-[#121624] rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">Jami To'lovlar</span>
                    <span className="text-base font-black text-yellow-400">
                      {transactions.filter((t) => t.status === 'approved').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} so'm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TO'LOVLAR RO'YXATI */}
            <div>
              <h3 className="text-base font-bold text-white mb-3">📋 To'lov so'rovlari va operatsiyalar</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5 px-3">ID</th>
                      <th className="py-2.5 px-3">Foydalanuvchi</th>
                      <th className="py-2.5 px-3">Summa</th>
                      <th className="py-2.5 px-3">Karta 4 xonasi</th>
                      <th className="py-2.5 px-3">Sana</th>
                      <th className="py-2.5 px-3">Holat</th>
                      <th className="py-2.5 px-3 text-right">Amal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-800/30">
                        <td className="py-3 px-3 font-mono text-slate-300">{tx.id}</td>
                        <td className="py-3 px-3 font-bold text-white">
                          {tx.userName}
                          <span className="block text-[10px] font-normal text-slate-400">{tx.userPhone}</span>
                        </td>
                        <td className="py-3 px-3 font-black text-green-400">{tx.amount.toLocaleString()} so'm</td>
                        <td className="py-3 px-3 font-mono text-slate-300">**** {tx.cardLastDigits}</td>
                        <td className="py-3 px-3 text-slate-400 text-[10px]">{tx.date}</td>
                        <td className="py-3 px-3">
                          {tx.status === 'pending' && <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-2 py-0.5 rounded-lg text-[10px]">Kutilmoqda</span>}
                          {tx.status === 'approved' && <span className="bg-green-500/10 border border-green-500/30 text-green-400 px-2 py-0.5 rounded-lg text-[10px]">Tasdiqlandi</span>}
                          {tx.status === 'rejected' && <span className="bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded-lg text-[10px]">Rad etildi</span>}
                        </td>
                        <td className="py-3 px-3 text-right">
                          {tx.status === 'pending' && (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleApproveTransaction(tx.id)}
                                className="bg-green-600 hover:bg-green-500 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]"
                              >
                                Tasdiqlash
                              </button>
                              <button
                                onClick={() => handleRejectTransaction(tx.id)}
                                className="bg-red-600 hover:bg-red-500 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]"
                              >
                                Rad etish
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

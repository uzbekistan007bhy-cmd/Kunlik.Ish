'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface JobForm {
  title: string;
  category: string;
  salary: string;
  location: string;
  description: string;
  time: string;
  images: string[];
}

const emptyJob: JobForm = {
  title: '',
  category: 'Qurilish',
  salary: '',
  location: 'Toshkent',
  description: '',
  time: '09:00 - 18:00',
  images: [],
};

export default function BulkUploadPage() {
  const [jobs, setJobs] = useState<JobForm[]>([{ ...emptyJob }]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Yangi e'lon qatori qo'shish (Max: 20 ta)
  const addJobRow = () => {
    if (jobs.length < 20) {
      setJobs([...jobs, { ...emptyJob, images: [] }]);
    } else {
      alert("Bir vaqtning o'zida maksimal 20 ta e'lon qo'shish mumkin!");
    }
  };

  // E'lon qatorini o'chirish (Min: 1 ta)
  const removeJobRow = (index: number) => {
    if (jobs.length > 1) {
      setJobs(jobs.filter((_, i) => i !== index));
    } else {
      alert("Kamida 1 ta e'lon bo'lishi shart!");
    }
  };

  // Oddiy maydonlarni o'zgartirish
  const handleChange = (index: number, field: keyof JobForm, value: string) => {
    const updated = [...jobs];
    (updated[index] as any)[field] = value;
    setJobs(updated);
  };

  // Har bir e'lon uchun rasm yuklash (Min: 0, Max: 4)
  const handleImageUpload = (jobIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentImages = jobs[jobIndex].images || [];
    if (currentImages.length + files.length > 4) {
      alert("Bitta e'lon uchun maksimal 4 ta rasm yuklashingiz mumkin!");
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setJobs((prevJobs) => {
            const newJobs = [...prevJobs];
            if (newJobs[jobIndex].images.length < 4) {
              newJobs[jobIndex].images = [...newJobs[jobIndex].images, reader.result as string];
            }
            return newJobs;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Rasmni o'chirish
  const removeImage = (jobIndex: number, imgIndex: number) => {
    setJobs((prevJobs) => {
      const newJobs = [...prevJobs];
      newJobs[jobIndex].images = newJobs[jobIndex].images.filter((_, i) => i !== imgIndex);
      return newJobs;
    });
  };

  // Formani saqlash
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/admin/bulk-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: 'uzbekistan007bhy@gmail.com',
          jobs,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg(`✅ Muvaffaqiyatli ${data.count} ta e'lon saqlandi!`);
        setJobs([{ ...emptyJob, images: [] }]);
      } else {
        setStatusMsg(`❌ Xatolik: ${data.error}`);
      }
    } catch (err) {
      setStatusMsg("❌ Server bilan bog'lanishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e17] text-slate-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Sarlavha */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide">
              Admin Panel: Ko'plab e'lon joylash ⚡
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Bir vaqtning o'zida kamida 1 ta, maksimal 20 ta e'lon kiriting. Har biriga 0–4 ta rasm biriktirish mumkin.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-4 py-2 rounded-xl">
              E'lonlar: {jobs.length} / 20
            </span>
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
              ← Asosiy sahifa
            </Link>
          </div>
        </div>

        {statusMsg && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-sm font-semibold text-white">
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-[#121624] border border-slate-800/80 rounded-3xl p-6 space-y-5 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                  E'lon #{idx + 1}
                </span>
                {jobs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeJobRow(idx)}
                    className="text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition"
                  >
                    O'chirish
                  </button>
                )}
              </div>

              {/* Ma'lumotlar kiritish maydonlari */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ish nomi</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Usta yordamchisi"
                    value={job.title}
                    onChange={(e) => handleChange(idx, 'title', e.target.value)}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ish haqi (so'm)</label>
                  <input
                    type="text"
                    required
                    placeholder="250 000"
                    value={job.salary}
                    onChange={(e) => handleChange(idx, 'salary', e.target.value)}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Kategoriya</label>
                  <select
                    value={job.category}
                    onChange={(e) => handleChange(idx, 'category', e.target.value)}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Qurilish">Qurilish</option>
                    <option value="Ombor">Ombor / Yuklash</option>
                    <option value="Kuryerlik">Kuryerlik</option>
                    <option value="Tozalash">Tozalash (Klining)</option>
                    <option value="Restoran">Restoran / Xizmat</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Joylashuv</label>
                  <input
                    type="text"
                    required
                    placeholder="Toshkent, Chilonzor"
                    value={job.location}
                    onChange={(e) => handleChange(idx, 'location', e.target.value)}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ish vaqti</label>
                  <input
                    type="text"
                    required
                    placeholder="09:00 - 18:00"
                    value={job.time}
                    onChange={(e) => handleChange(idx, 'time', e.target.value)}
                    className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Tafsilotlar</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ish haqida qisqacha ma'lumot..."
                  value={job.description}
                  onChange={(e) => handleChange(idx, 'description', e.target.value)}
                  className="w-full bg-[#1a2035] border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Rasmlar yuklash bo'limi (0-4 ta) */}
              <div className="pt-2 border-t border-slate-800/60">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Rasmlar (Min: 0, Max: 4)
                  </span>
                  <span className="text-xs text-blue-400 font-semibold">
                    {job.images.length}/4 ta rasm
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Yuklangan rasmlar prevyusi */}
                  {job.images.map((img, imgIdx) => (
                    <div key={imgIdx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700 group">
                      <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx, imgIdx)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 font-bold text-xs transition"
                      >
                        O'chirish
                      </button>
                    </div>
                  ))}

                  {/* Rasm qo'shish tugmasi */}
                  {job.images.length < 4 && (
                    <label className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-700 hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer bg-[#1a2035]/40 hover:bg-[#1a2035] transition">
                      <span className="text-blue-400 text-xl font-bold">+</span>
                      <span className="text-[9px] text-slate-400">Rasm</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(idx, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Harakatlar tugmalari */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            {jobs.length < 20 && (
              <button
                type="button"
                onClick={addJobRow}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition"
              >
                + Yana e'lon qatori qo'shish ({jobs.length}/20)
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm transition shadow-lg shadow-blue-600/30"
            >
              {loading ? 'Saqlanmoqda...' : `${jobs.length} ta e'lonni joylash 🚀`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface JobForm {
  title: string;
  category: string;
  salary: string;
  location: string;
  description: string;
  time: string;
}

const emptyJob: JobForm = {
  title: '',
  category: 'Qurilish',
  salary: '',
  location: 'Toshkent',
  description: '',
  time: '09:00 - 18:00',
};

export default function BulkUploadPage() {
  const [jobs, setJobs] = useState<JobForm[]>([ { ...emptyJob } ]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Yangi forma qatori qo'shish (Max: 20 ta)
  const addJobRow = () => {
    if (jobs.length < 20) {
      setJobs([...jobs, { ...emptyJob }]);
    }
  };

  // Qatordan o'chirish
  const removeJobRow = (index: number) => {
    if (jobs.length > 1) {
      setJobs(jobs.filter((_, i) => i !== index));
    }
  };

  // Ma'lumotlarni o'zgartirish
  const handleChange = (index: number, field: keyof JobForm, value: string) => {
    const updated = [...jobs];
    updated[index][field] = value;
    setJobs(updated);
  };

  // Saqlash
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
        setJobs([{ ...emptyJob }]);
      } else {
        setStatusMsg(`❌ Xatolik: ${data.error}`);
      }
    } catch (err) {
      setStatusMsg("❌ Server bilan bog'lanishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Panel: Ko'plab e'lon joylash</h1>
          <p className="text-slate-400 text-sm">Bir vaqtning o'zida max 20 ta e'lon kiritishingiz mumkin.</p>
        </div>
        <div className="text-amber-400 font-bold bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20">
          Jami: {jobs.length} / 20
        </div>
      </div>

      {statusMsg && (
        <div className="mb-6 p-4 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium">
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-sm font-semibold text-blue-400">E'lon #{idx + 1}</span>
              {jobs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeJobRow(idx)}
                  className="text-red-400 hover:text-red-300 text-xs font-semibold"
                >
                  O'chirish
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Ish nomi (masalan: Gipsokarton usta)"
                required
                value={job.title}
                onChange={(e) => handleChange(idx, 'title', e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Ish haqi (so'mda)"
                required
                value={job.salary}
                onChange={(e) => handleChange(idx, 'salary', e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
              />
              <select
                value={job.category}
                onChange={(e) => handleChange(idx, 'category', e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Qurilish">Qurilish</option>
                <option value="Ombor">Ombor / Yuklash</option>
                <option value="Kuryerlik">Kuryerlik</option>
                <option value="Tozalash">Tozalash (Klining)</option>
                <option value="Restoran">Restoran / Xizmat</option>
              </select>
            </div>

            <textarea
              placeholder="Tafsilotlar va talablar..."
              rows={2}
              value={job.description}
              onChange={(e) => handleChange(idx, 'description', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}

        <div className="flex gap-4 items-center">
          {jobs.length < 20 && (
            <button
              type="button"
              onClick={addJobRow}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-3 rounded-xl font-semibold text-sm transition"
            >
              + Yana e'lon qatori qo'shish
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
          >
            {loading ? 'Saqlanmoqda...' : `${jobs.length} ta e'lonni saqlash`}
          </button>
        </div>
      </form>
    </div>
  );
}

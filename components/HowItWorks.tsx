import React from 'react';

export default function HowItWorks() {
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

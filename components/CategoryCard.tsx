import React from 'react';

interface CategoryCardProps {
  icon: string;
  name: string;
  count: number;
}

export default function CategoryCard({ icon, name, count }: CategoryCardProps) {
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

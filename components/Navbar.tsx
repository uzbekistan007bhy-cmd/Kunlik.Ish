import Link from 'next/link';
import Image from 'next/image';

export default function Navbar({ userEmail }: { userEmail?: string }) {
  const isAdmin = userEmail === 'uzbekistan007bhy@gmail.com';

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
            1K
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            1KUNLIK<span className="text-blue-500">.UZ</span>
          </span>
        </Link>

        {/* Navigation & Admin Panel Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/jobs"
            className="text-slate-300 hover:text-white transition font-medium"
          >
            Barcha e'lonlar
          </Link>
          
          {isAdmin && (
            <Link
              href="/admin/bulk-upload"
              className="bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2"
            >
              ⚡ Admin (20x E'lon)
            </Link>
          )}

          <Link
            href="/add-job"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md shadow-blue-600/30"
          >
            + E'lon berish
          </Link>
        </div>
      </div>
    </header>
  );
}

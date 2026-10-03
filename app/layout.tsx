import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '1KUNLIK - Kunlik ishlar platformasi',
  description: 'Kunlik va qisqa muddatli ishlarni topish hamda ishchi yollash platformasi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={`${inter.className} min-h-screen bg-[#0b0e17] text-slate-100`}>
        {children}
      </body>
    </html>
  );
}

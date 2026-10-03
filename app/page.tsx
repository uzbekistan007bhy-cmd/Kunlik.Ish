import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JobCard from '@/components/JobCard';
import CategoryCard from '@/components/CategoryCard';
import HowItWorks from '@/components/HowItWorks';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Mock Data (Real loyihada Neon PostgreSQL / Prisma bazasidan keladi)
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
    applicants: '2/5',
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
    applicants: '4/6',
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
    applicants: '1/3',
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
    applicants: '3/4',
    employer: 'Grand Hotel',
    rating: 4.9
  },
  {
    id: '5',
    badge: 'YANGI',
    isUrgent: false,
    title: ' Qurilish materiallarini tashish',
    location: 'Toshkent sh., Shayxontohur t.',
    date: 'Ertaga',
    time: '08:00 – 17:00',
    duration: '9 soat',
    salary: '250 000 so‘m',
    applicants: '2/5',
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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Urgent Jobs Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ⚡ Zudlik bilan ishchi kerak
            </h2>
            <p className="text-sm text-slate-500 mt-1">Hozirning o‘zida ish boshlaydigan shoshilinch eʼlonlar</p>
          </div>
          <Link href="/jobs?urgent=true" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Barchasini ko‘rish &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {urgentJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Ishni yo‘nalish bo‘yicha toping
              </h2>
              <p className="text-sm text-slate-500 mt-1">O‘zingizga qiziqarli sohani tanlang</p>
            </div>
            <Link href="/categories" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Barcha kategoriyalar &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, idx) => (
              <CategoryCard key={idx} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Today's Jobs Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Bugungi ishlar lentasi
            </h2>
            <p className="text-sm text-slate-500 mt-1">Bugun mavjud bo‘lgan eng yangi imkoniyatlar</p>
          </div>
          <Link href="/jobs" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Barchasini ko‘rish &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regularJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Trust Section */}
      <TrustSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userEmail, jobs } = body;

    // Admin emailini tekshirish
    if (userEmail !== 'uzbekistan007bhy@gmail.com') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    if (!Array.isArray(jobs) || jobs.length === 0) {
      return NextResponse.json({ error: "E'lonlar ro'yxati bo'sh" }, { status: 400 });
    }

    if (jobs.length > 20) {
      return NextResponse.json({ error: "Bir vaqtning o'zida maksimal 20 ta e'lon kiriting" }, { status: 400 });
    }

    // Hozircha e'lonlarni muvaffaqiyatli qabul qilinganini qaytaradi
    return NextResponse.json({ success: true, count: jobs.length });
  } catch (error) {
    return NextResponse.json({ error: 'Serverda xatolik yuz berdi' }, { status: 500 });
  }
}

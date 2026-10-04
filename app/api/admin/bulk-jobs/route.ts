import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userEmail, jobs } = body;

    // Admin emailini tekshirish
    if (userEmail !== 'uzbekistan007bhy@gmail.com') {
      return NextResponse.json({ error: 'Ruxsat berilmagan (Unauthorized)' }, { status: 403 });
    }

    if (!Array.isArray(jobs) || jobs.length === 0) {
      return NextResponse.json({ error: "E'lonlar ro'yxati bo'sh" }, { status: 400 });
    }

    if (jobs.length > 20) {
      return NextResponse.json({ error: "Bir vaqtning o'zida maksimal 20 ta e'lon kiriting" }, { status: 400 });
    }

    // Admin foydalanuvchisini olish yoki yaratish
    let adminUser = await prisma.user.findUnique({
      where: { email: 'uzbekistan007bhy@gmail.com' }
    });

    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          email: 'uzbekistan007bhy@gmail.com',
          phone: '+998900000000',
          fullName: 'Admin',
          role: 'ADMIN'
        }
      });
    }

    // 20 ta e'lonni bir vaqtda bazaga yozish
    const createdJobs = await prisma.job.createMany({
      data: jobs.map((job: any) => ({
        title: job.title,
        category: job.category || 'Boshqa',
        description: job.description,
        salary: Number(job.salary) || 0,
        location: job.location || 'Toshkent',
        address: job.address || '',
        time: job.time || 'Kunlik',
        images: job.images || [],
        employerId: adminUser.id
      }))
    });

    return NextResponse.json({ success: true, count: createdJobs.count });
  } catch (error) {
    console.error('Bulk job error:', error);
    return NextResponse.json({ error: 'Serverda xatolik yuz berdi' }, { status: 500 });
  }
}

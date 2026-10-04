import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email yoki kod kiritilmagan!" }, { status: 400 });
    }

    // Gmail SMTP sozlamalari
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Sizning Gmail manzilingiz
        pass: process.env.EMAIL_PASS, // Gmail App Password (16 xonali maxfiy kalit)
      },
    });

    const mailOptions = {
      from: `"Verification Codes" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Tasdiqlash kodi 🔐',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0b0e17; color: #ffffff; border-radius: 12px; text-align: center; max-width: 400px; margin: 0 auto;">
          <h2 style="color: #60a5fa; margin-bottom: 8px;">Tasdiqlash kodi 🔐</h2>
          <p style="color: #9ca3af; font-size: 14px; margin-bottom: 20px;">Hisobingizni tasdiqlash uchun quyidagi 4 xonali kodni kiriting:</p>
          <div style="background-color: #1f2937; padding: 16px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #38bdf8; display: inline-block;">
            ${code}
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">Agar bu so'rovni siz yubormagan bo'lsangiz, xabarni e'tiborsiz qoldiring.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Kod emailga yuborildi!" });
  } catch (error) {
    console.error("Email yuborishda xatolik:", error);
    return NextResponse.json({ error: "Email yuborishda xatolik yuz berdi" }, { status: 500 });
  }
}

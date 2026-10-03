'use client';

import { useState } from 'react';

export default function HomePage() {
  const [isClicked, setIsClicked] = useState(false);

  // Tugma bosilganda ishlaydigan funksiya (ovoz va animatsiya uchun)
  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // Animatsiya vaqti

    // Yengil klik ovozini chiqarish (Brauzerning o'z synthesizeri orqali)
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // Re (D5) nota
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch {
      // Audio qo'llab-quvvatlanmasa jim turadi
    }
  };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '2.2rem',
          color: '#1a1a1a',
          marginBottom: '15px',
          fontWeight: '700'
        }}>
          1KUNLIK 🚀
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          Kunlik va qisqa muddatli ishlarni topish hamda professional ishchi yollash platformasi.
        </p>

        {/* Chiroyli animatsiyali va ovozli tugma */}
        <button
          onClick={handleButtonClick}
          style={{
            background: 'linear-gradient(135deg, #0070f3 0%, #0051bb 100%)',
            color: 'white',
            border: 'none',
            padding: '14px 28px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(0, 112, 243, 0.3)',
            transform: isClicked ? 'scale(0.94)' : 'scale(1)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            outline: 'none'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Ro'yxatdan o'tish / Kirish
        </button>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';

export default function HomePage() {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tugma bosilganda animatsiya va yengil klik ovozi
  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 250);

    // Brauzer orqali klik ovozini chiqarish
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio qo'llab-quvvatlanmasa xato bermaydi
    }

    setIsModalOpen(true);
  };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #1a1c29 0%, #0b0c10 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      color: '#fff'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '50px 40px',
        borderRadius: '30px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        textAlign: 'center',
        maxWidth: '480px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '15px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          1KUNLIK 🚀
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#9ca3af',
          marginBottom: '35px',
          lineHeight: '1.6'
        }}>
          Kunlik va qisqa muddatli ishlarni topish hamda professional darajada ishchi yollash platformasi.
        </p>

        {/* Interaktiv va animatsiyali tugma */}
        <button
          onClick={handleButtonClick}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            fontSize: '1.05rem',
            fontWeight: '600',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
            transform: isClicked ? 'scale(0.92)' : 'scale(1)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            outline: 'none',
            width: '100%'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Ro'yxatdan o'tish / Kirish
        </button>
      </div>

      {/* Bosganda chiqadigan modal oynacha namunasi */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#1f2937',
            padding: '30px',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#fff' }}>Xush kelibsiz!</h3>
            <p style={{ color: '#9ca3af', marginBottom: '25px', fontSize: '0.95rem' }}>
              Ro'yxatdan o'tish tizimi tez orada ishga tushadi.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                background: '#374151',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

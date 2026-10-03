export default function HomePage() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '10px' }}>
        1KUNLIK — Ish topish platformasi
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#555', textAlign: 'center', maxWidth: '600px' }}>
        Kunlik, soatlik va qisqa muddatli ishlarni topish hamda ishchi taklif qilish xizmati.
      </p>
      <div style={{ marginTop: '20px' }}>
        <button style={{ padding: '12px 24px', fontSize: '1rem', color: '#fff', backgroundColor: '#0070f3', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          E'lonlarni ko'rish
        </button>
      </div>
    </main>
  )
}

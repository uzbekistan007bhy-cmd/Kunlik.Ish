export const metadata = {
  title: 'Kunlik Ish',
  description: 'Kunlik va qisqa muddatli ishlar platformasi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#f4f4f9' }}>
        {children}
      </body>
    </html>
  )
}

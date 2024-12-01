// app/layout.tsx
import 'react-datepicker/dist/react-datepicker.css'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'GNSS Catalog Search',
  description: 'Search GNSS data by point or region',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
import './globals.css'
import Header from './components/common/Header'

export const metadata = {
  title: 'বাজার দর - নিত্যপ্রয়োজনীয় বাজারদর',
  description: 'আজকের বাজারের দাম এক নজরে'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='bn'>
      <body className='min-h-screen flex flex-col bg-[#f5f6f8] text-gray-900 antialiased'>
        <Header />
        <main className='flex-1'>{children}</main>
      </body>
    </html>
  )
}

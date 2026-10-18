import './globals.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'


export default function RootLayout ({ children }) {
  return (
    <html lang='bn'>
      <body className='min-h-screen flex flex-col bg-[#f5f6f8] text-gray-900 antialiased'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  )
}

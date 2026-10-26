import './globals.css'
import { Hind_Siliguri } from 'next/font/google'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { Toaster } from 'react-hot-toast'
import AuthToast from './components/common/AuthToast'

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap'
})

export default function RootLayout ({ children }) {
  return (
    <html lang='bn' className={hindSiliguri.variable}>
      <body
        className={`${hindSiliguri.className} min-h-screen flex flex-col bg-[#f5f6f8] text-gray-900 antialiased`}
      >
        <Toaster
          position='top-center'
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              fontSize: '13px',
              borderRadius: '10px',
              padding: '10px 16px'
            }
          }}
        />
        <AuthToast />
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  )
}
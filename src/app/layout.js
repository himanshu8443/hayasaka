import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import MusicPlayer from '@/components/MusicPlayer'
import Providers from '@/redux/Providers'
import TopProgressBar from '@/components/topProgressBar/TopProgressBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hayasaka',
  description: 'Music streaming app',
  image: 'https://res.cloudinary.com/dbr73rpz9/image/upload/v1690380865/images/logo-color_noktgr.png',
  url: 'https://hayasaka.vercel.app',
  type: 'website',
  site_name: 'Hayasaka',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <TopProgressBar />
      <Navbar />
        {children}
        <div className='h-20'></div>
        <div className="fixed  bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#0b0b16] backdrop-blur-lg rounded-t-3 z-50">
          <MusicPlayer />
        </div>
      </Providers>
        </body>
        
    </html>
  )
}

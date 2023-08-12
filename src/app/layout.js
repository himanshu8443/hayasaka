import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import MusicPlayer from "@/components/MusicPlayer";
import Providers from "@/redux/Providers";
import TopProgressBar from "@/components/topProgressBar/TopProgressBar";
import Favicon from "./favicon.ico";
import SongsHistory from "@/components/SongsHistory";
import PassiveListner from "@/components/Homepage/PassiveListner";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hayasaka",
  description: "Music streaming app",
  image:
    "https://res.cloudinary.com/dbr73rpz9/image/upload/v1690380865/images/logo-color_noktgr.png",
  url: "https://hayasaka.vercel.app",
  type: "website",
  icons: [{ rel: "icon", url: Favicon.src }],
  site_name: "Hayasaka",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PassiveListner />
        <Providers>
          <AuthProvider>
            <TopProgressBar />
            <SongsHistory />
            <Navbar />
            <Toaster />
            {children}
            <div className="h-20"></div>
            <div className="fixed  bottom-0 left-0 right-0 flex backdrop-blur-lg rounded-t-3 z-50">
              <MusicPlayer />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

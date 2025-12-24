import Navbar from "@/components/Navbar";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import Providers from "@/redux/Providers";
import TopProgressBar from "@/components/topProgressBar/TopProgressBar";
import Favicon from "./favicon.ico";
import SongsHistory from "@/components/SongsHistory";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider";
import { Poppins } from "next/font/google";
import Script from "next/script";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin-ext"],
  display: "swap",
});

const siteUrl = "https://hayasaka.8man.in";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hayasaka - Free Music Streaming & Download | Listen Online",
    template: "%s | Hayasaka",
  },
  description:
    "Stream and download your favorite songs for free on Hayasaka. Listen to Bollywood, Hindi, Punjabi, and international music. Create playlists, discover new artists, and enjoy high-quality music streaming.",
  keywords: [
    "music streaming",
    "free music download",
    "listen songs online",
    "hindi songs",
    "bollywood songs",
    "punjabi songs",
    "download songs free",
    "music player",
    "online music",
    "mp3 download",
    "hayasaka music",
    "free music app",
    "stream music free",
    "latest songs",
    "new songs 2024",
  ],
  authors: [{ name: "Hayasaka" }],
  creator: "Hayasaka",
  publisher: "Hayasaka",
  icons: [{ rel: "icon", url: Favicon.src }],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Hayasaka",
    title: "Hayasaka - Free Music Streaming & Download",
    description:
      "Stream and download your favorite songs for free. Listen to Bollywood, Hindi, Punjabi music and more.",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Hayasaka Music App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayasaka - Free Music Streaming & Download",
    description:
      "Stream and download your favorite songs for free. Listen to English, Hindi, Punjabi music and more.",
    images: ["/icon-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
};

// JSON-LD Structured Data for Website with SearchAction (enables Google Sitelinks Searchbox)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Hayasaka",
      description: "Free music streaming and download platform",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search/{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Hayasaka",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512x512.png`,
        width: 512,
        height: 512,
      },
      sameAs: [],
    },
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapp`,
      name: "Hayasaka",
      description:
        "Stream and download your favorite songs for free on Hayasaka",
      url: siteUrl,
      applicationCategory: "MusicApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Free music streaming",
        "Music download",
        "Create playlists",
        "Favorite songs",
        "Search songs",
        "Artist profiles",
        "Album browsing",
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Z4FJ5T627Q"
      ></Script>
      <Script>
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z4FJ5T627Q');
  `}
      </Script>
      <body className={poppins.className}>
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

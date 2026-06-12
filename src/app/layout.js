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
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  OG_IMAGE,
  TWITTER_HANDLE,
  absoluteUrl,
} from "@/utils/siteConfig";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin-ext"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "music",
  classification: "Music Streaming",
  referrer: "origin-when-cross-origin",
  verification: {
    google: "xKWFwcLg7uqtQGOTNIKraZ8uxuWF9Jxa_By43QL3678",
  },
  icons: [
    { rel: "icon", url: Favicon.src },
    { rel: "apple-touch-icon", url: "/icon-192x192.png" },
  ],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 512,
        height: 512,
        alt: `${SITE_NAME} - ${SITE_TAGLINE}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": SITE_NAME,
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/icon-256x256.png",
    "theme-color": "#000000",
  },
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: ["Hayasaka Music", "Hayasaka App", "Hayasaka.8man.in"],
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search/{search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "Hayasaka Music",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: absoluteUrl(OG_IMAGE),
        width: 512,
        height: 512,
        caption: SITE_NAME,
      },
      image: { "@id": `${SITE_URL}/#logo` },
      foundingDate: "2023",
      slogan: SITE_TAGLINE,
      sameAs: ["https://github.com/himanshu8443/hayasaka"],
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: SITE_NAME,
      alternateName: "Hayasaka Music",
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      applicationCategory: "MusicApplication",
      applicationSubCategory: "Music Streaming",
      operatingSystem: "Web, Android, iOS, Windows, macOS, Linux",
      browserRequirements: "Requires JavaScript and a modern browser.",
      isAccessibleForFree: true,
      inLanguage: ["en", "hi", "pa", "ta", "te"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Free unlimited music streaming",
        "MP3 song download",
        "Custom playlist creation",
        "Favorite songs library",
        "Lyrics and album art",
        "Artist and album browsing",
        "Multi-language music (Hindi, English, Punjabi, Tamil, Telugu)",
        "Offline ready PWA",
        "Ad-light listening experience",
      ],
      screenshot: absoluteUrl(OG_IMAGE),
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Hayasaka free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Hayasaka is completely free. You can stream and download music, build playlists, and follow artists without paying anything.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to sign up to listen on Hayasaka?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can stream music on Hayasaka without an account. Sign up only if you want to save favorites and create personal playlists synced across devices.",
          },
        },
        {
          "@type": "Question",
          name: "What languages of songs are available on Hayasaka?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hayasaka covers Hindi, English, Punjabi, Tamil, Telugu, Bhojpuri, Marathi, Bengali, Gujarati, and more, including Bollywood and indie tracks.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download MP3 songs from Hayasaka?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Each track on Hayasaka offers a download option so you can save songs in MP3 format for offline listening.",
          },
        },
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
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
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

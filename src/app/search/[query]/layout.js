import { SITE_URL, SITE_NAME } from "@/utils/siteConfig";

const siteUrl = SITE_URL;

// Collapse case + whitespace + encoding variants to one canonical form so
// /search/Bollywood%20Songs, /search/bollywood+songs and
// /search/bollywood%20songs all point at the same canonical URL.
function normalizeQuery(raw) {
  try {
    return decodeURIComponent(raw.replace(/\+/g, " "))
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  } catch {
    return raw.trim().toLowerCase();
  }
}

export async function generateMetadata({ params }) {
  const normalized = normalizeQuery(params.query);
  const display = normalized.replace(/\b\w/g, (c) => c.toUpperCase());
  const canonicalSlug = encodeURIComponent(normalized);
  const canonicalUrl = `${siteUrl}/search/${canonicalSlug}`;

  // Empty / pathological queries shouldn't be indexed.
  const indexable = normalized.length >= 2 && normalized.length <= 80;

  return {
    title: `${display} - Songs, MP3 & Playlists`,
    description: `Listen to ${display} songs online for free on ${SITE_NAME}. Download ${display} MP3 songs, albums, and playlists in high quality. Stream the latest and trending ${display} music.`,
    keywords: [
      normalized,
      `${normalized} songs`,
      `${normalized} download`,
      `${normalized} mp3`,
      `listen ${normalized} online`,
      `${normalized} music`,
      "free music download",
      "stream songs",
    ],
    openGraph: {
      title: `${display} - Songs, MP3 & Playlists | ${SITE_NAME}`,
      description: `Listen to ${display} songs online for free. Download mp3 songs and stream high quality music.`,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${display} - Songs, MP3 & Playlists | ${SITE_NAME}`,
      description: `Listen to ${display} songs online for free. Download mp3 songs and stream high quality music.`,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default function SearchLayout({ children }) {
  return <>{children}</>;
}

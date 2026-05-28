import { SITE_URL, SITE_NAME } from "@/utils/siteConfig";

export const metadata = {
  title: "My Favourites",
  description: `Your saved favourite songs on ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/favourite` },
  // User-specific page; no value to Google index.
  robots: { index: false, follow: true },
};

export default function FavouriteLayout({ children }) {
  return <>{children}</>;
}

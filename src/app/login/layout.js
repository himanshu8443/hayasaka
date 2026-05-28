import { SITE_URL, SITE_NAME } from "@/utils/siteConfig";

export const metadata = {
  title: "Login",
  description: `Sign in to ${SITE_NAME} to access your favourite songs and personal playlists.`,
  alternates: { canonical: `${SITE_URL}/login` },
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }) {
  return <>{children}</>;
}

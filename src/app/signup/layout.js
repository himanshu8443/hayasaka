import { SITE_URL, SITE_NAME } from "@/utils/siteConfig";

export const metadata = {
  title: "Sign Up",
  description: `Create a free ${SITE_NAME} account to save favourite songs and build your own playlists.`,
  alternates: { canonical: `${SITE_URL}/signup` },
  robots: { index: false, follow: true },
};

export default function SignupLayout({ children }) {
  return <>{children}</>;
}

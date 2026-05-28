import { SITE_URL, SITE_NAME } from "@/utils/siteConfig";

export const metadata = {
  title: "Reset Password",
  description: `Reset your ${SITE_NAME} account password.`,
  alternates: { canonical: `${SITE_URL}/reset-password` },
  robots: { index: false, follow: false },
};

export default function ResetPasswordLayout({ children }) {
  return <>{children}</>;
}

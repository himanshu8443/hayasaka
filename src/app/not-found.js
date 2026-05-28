import React from "react";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/utils/siteConfig";

export const metadata = {
  title: "Page Not Found",
  description: `The page you are looking for does not exist on ${SITE_NAME}. Head back to the home page and keep listening.`,
  alternates: { canonical: `${SITE_URL}/` },
  robots: { index: false, follow: true },
};

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden text-white px-6 text-center">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-2xl font-bold mt-2">Page Not Found</h2>
      <p className="mt-3 max-w-md text-gray-300">
        The page you are looking for moved, renamed, or never existed on{" "}
        {SITE_NAME}.
      </p>
      <Link
        href="/"
        className="mt-6 bg-[#00e6e6] text-black px-5 py-2 rounded-lg font-medium"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;

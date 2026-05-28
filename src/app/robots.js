import { SITE_URL } from "@/utils/siteConfig";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/myPlaylists/",
          "/reset-password/",
          "/login",
          "/signup",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/myPlaylists/", "/reset-password/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/myPlaylists/", "/reset-password/"],
      },
      {
        // Block AI scrapers that don't drive any indexing benefit
        userAgent: ["GPTBot", "CCBot", "anthropic-ai", "ClaudeBot"],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

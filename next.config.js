/** @type {import('next').NextConfig} */
const NEW_HOST = "hayasaka.8man.in";
const LEGACY_HOSTS = [
  "hayasaka.live",
  "www.hayasaka.live",
  "hayasaka.vercel.app",
];

const nextConfig = {
  images: {
    domains: ["c.saavncdn.com", "static.saavncdn.com", "www.jiosaavn.com"],
  },
  // Permanent (308) redirects from any legacy host to the canonical domain.
  // Helps Google consolidate signals and drop the old URLs from the index.
  async redirects() {
    return LEGACY_HOSTS.map((legacyHost) => ({
      source: "/:path*",
      has: [{ type: "host", value: legacyHost }],
      destination: `https://${NEW_HOST}/:path*`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        // Strong canonical signal + safe defaults across all routes.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml" },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "./taglib-web.wasm$": require("path").resolve(
        __dirname,
        "node_modules/taglib-wasm/dist/taglib-web.wasm",
      ),
    };

    // Handle taglib-wasm browser build
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        module: false,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);

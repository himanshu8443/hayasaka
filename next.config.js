/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["c.saavncdn.com", "static.saavncdn.com", "www.jiosaavn.com"],
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

module.exports = withPWA(nextConfig);

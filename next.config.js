/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['c.saavncdn.com','static.saavncdn.com','www.jiosaavn.com'],
    },
}




const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
  });
  
  module.exports = withPWA({
    reactStrictMode: true,
  });

module.exports = nextConfig
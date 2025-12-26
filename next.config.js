/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    // koristi next/image kako treba
    unoptimized: false,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.go2njemacka.de',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;

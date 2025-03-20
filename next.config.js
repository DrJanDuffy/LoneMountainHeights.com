/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['findlonemountainhomes.com', 'www.findlonemountainhomes.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'findlonemountainhomes.com',
          },
        ],
        destination: 'https://www.findlonemountainhomes.com',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https://widgets.realscout.com https://www.homebot.ai https://widgets.cloudcma.com https://cdn.percy.ai; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widgets.realscout.com https://www.homebot.ai https://widgets.cloudcma.com https://cdn.percy.ai https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'self';"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 
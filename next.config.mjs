/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['strapi-backend-o8eo.onrender.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.icon-icons.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  swcMinify: true,
};

export default nextConfig;

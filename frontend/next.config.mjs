/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    forceSwcTransforms: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'talk-time-backend.vercel.app',
        host: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

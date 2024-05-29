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
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

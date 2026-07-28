import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'www.concertarchives.org' },
      { protocol: 'https', hostname: 'images.complex.com' },
    ],
  },
}

export default nextConfig

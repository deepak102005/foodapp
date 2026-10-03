/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allow local images from public folder (no remotePatterns needed)
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/hero-video-old.mp4',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
      {
        source: '/hero-video.mp4',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
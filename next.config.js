const { withNextVideo } = require('next-video/process')

/** @type {import('next').NextConfig} */
const nextConfig = withNextVideo({
  webpack: config => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]' // This preserves original filename
      }
    });
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.mux.com",
      },
    ],
  },
});

module.exports = nextConfig;

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
    
    // Fix for nodemailer and other Node.js modules
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    
    // Add fallbacks for Node.js modules that shouldn't be bundled client-side
    Object.assign(config.resolve.fallback, {
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser'),
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

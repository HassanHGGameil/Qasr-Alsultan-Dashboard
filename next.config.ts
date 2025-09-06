
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'standalone',
  
  // Ensure proper trailing slashes
  trailingSlash: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },

  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default withNextIntl(nextConfig);
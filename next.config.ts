import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    domains: [
      "lh3.googleusercontent.com", 
      "avatars.githubusercontent.com",
    ],
  },
};

export default withNextIntl(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gixczojumpkpoyrnxjfr.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;

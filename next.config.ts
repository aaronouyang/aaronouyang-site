import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/amoled", destination: "/oled", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  images:{
    dangerouslyAllowSVG:true,
    remotePatterns:[
      {
        protocol:'https',
        hostname:'*',
      }
    ]
  }
};

export default nextConfig;
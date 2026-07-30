import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = '';

if (isGithubActions) {
  basePath = '/norway-site';
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.blanxer.com',
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com', // typical for uploadcare
      }
    ],
  },
};

export default withBundleAnalyzer(nextConfig);

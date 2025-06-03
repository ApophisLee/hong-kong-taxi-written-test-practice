/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages 的 base path
  basePath: process.env.NODE_ENV === 'production' ? '/hong-kong-taxi-written-test-practice' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/hong-kong-taxi-written-test-practice/' : '',
}

module.exports = nextConfig

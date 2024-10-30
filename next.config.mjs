/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/market',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;

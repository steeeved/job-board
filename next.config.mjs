/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["dynamoose"],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false };
//   },
// };

// module.exports = nextConfig;
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

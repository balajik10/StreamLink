/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  webpack: (config: import('webpack').Configuration) => {
    config.module?.rules?.push({
      test: /\.mjs$/, // Correct regex for `.mjs` files
      include: /node_modules/, // Includes files from `node_modules`
      type: "javascript/auto", // Correct type to handle `.mjs` in Webpack
    });
    return config; // Ensure config is returned
  },
};

module.exports = nextConfig;

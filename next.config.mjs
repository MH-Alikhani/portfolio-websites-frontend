/** @type {import('next').NextConfig} */
const nextJsConfig = {
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.imagin.studio",
        port: "",
        pathname: "/**",
      },
    ],
  },

  compress: true,

  optimizeFonts: true,

  env: {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextJsConfig

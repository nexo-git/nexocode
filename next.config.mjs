/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXOBOT_API_URL:      process.env.NEXOBOT_API_URL      ?? '',
    NEXOBOT_ADMIN_TOKEN:  process.env.NEXOBOT_ADMIN_TOKEN  ?? '',
  },
  images: {
    remotePatterns: [],
  },
}

export default nextConfig

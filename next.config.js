/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nwllvhheepuafgifrtlu.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'uyvuezuqecavttegymmj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig

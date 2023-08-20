/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'nwllvhheepuafgifrtlu.supabase.co',
      'uyvuezuqecavttegymmj.supabase.co',
      'res.cloudinary.com',
    ],
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'nwllvhheepuafgifrtlu.supabase.co',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'uyvuezuqecavttegymmj.supabase.co',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //   },
    // ],
  },
}

module.exports = nextConfig

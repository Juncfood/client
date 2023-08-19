/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
}

module.exports = nextConfig

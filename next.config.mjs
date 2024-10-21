/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/register",
        permanent: false,
      },
    ]
  },
}

export default nextConfig

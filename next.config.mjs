/** @type {import("next").NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/modules',
                permanent: false,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
}

export default nextConfig

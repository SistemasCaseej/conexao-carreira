// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "127.0.0.1",
                port: "9199",
            },
        ],
    },
};

export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "utfs.io",
          },
          {
            protocol: "https",
            hostname: "image.mux.com",
          },
        ],
      },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "",
        pathname: "/public/**",
      },

      {
        protocol: "https",
        hostname: "picsum.photos",
      },

      {
        protocol: "https",
        hostname: "loremflickr.com",
      },

      {
        protocol: "http",
        hostname: "subdomain",
      },
    ],
  },
};

export default nextConfig;

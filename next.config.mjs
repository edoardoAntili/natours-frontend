/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  async rewrites() {
    return [
      {
        source: "/img/:path*",
        destination: "https://natours-backend-msf1.onrender.com/img/:path*",
      },
    ];
  },
};

export default nextConfig;

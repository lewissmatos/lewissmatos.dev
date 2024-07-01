/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: "/lewissmatos.dev",
	async redirects() {
		return [
			// Basic redirect
			{
				source: "/",
				destination: "/home",
				permanent: true,
			},
			{
				source: "/api/:path*",
				destination: "/api/:path*",
				permanent: false,
			},
		];
	},
};

export default nextConfig;

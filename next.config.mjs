/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	basePath: "/lewissmatos.dev",
	async redirects() {
		return [
			// Basic redirect
			{
				source: "/",
				destination: "/home",
				permanent: true,
			},
		];
	},
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image-cdn-**.spotifycdn.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "**",
			}
		],
	},
	output: "standalone",
};

export default nextConfig;
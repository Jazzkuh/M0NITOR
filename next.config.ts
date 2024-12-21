import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image-cdn-**.spotifycdn.com",
				port: "",
				pathname: "**",
			}
		],
	},
	output: "standalone",
};

export default nextConfig;

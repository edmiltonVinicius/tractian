/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tractian-img.s3.amazonaws.com',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;

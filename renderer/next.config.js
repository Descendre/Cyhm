/** @type {import('next').NextConfig} */
module.exports = {
	distDir: process.env.NODE_ENV === 'production' ? '../app' : '.next',
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	webpack: (config) => {
		return config;
	},
};

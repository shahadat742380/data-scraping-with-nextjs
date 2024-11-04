/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Enable CORS for all routes under /api/**/**
          source: '/api/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*', // Allows access from any origin
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, PUT, DELETE, OPTIONS', // Specify allowed methods
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'X-Requested-With, Content-Type, Authorization', // Specify allowed headers
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  
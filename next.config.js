/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    TEST_VARIABLE: process.env.TEST_VARIABLE,
  },
};

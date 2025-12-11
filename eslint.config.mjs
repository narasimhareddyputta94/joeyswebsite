import nextConfig from "eslint-config-next";

// Use Next.js flat config directly (avoids circular refs with compat)
const config = [
  { ignores: ["node_modules/**"] },
  ...nextConfig,
];

export default config;

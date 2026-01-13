import type { NextConfig } from "next";
import SapioConfig from "@/config/sapioConfig";


const missingKeys = Object.entries(SapioConfig)
    .filter(([_, value]) => value == null || value === '')
    .map(([key]) => key);

if (missingKeys.length > 0) {
    throw new Error(`Missing required config values: ${missingKeys.join(', ')}`);
}
const nextConfig: NextConfig = {
    reactStrictMode: true,
};

export default nextConfig;

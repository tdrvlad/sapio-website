import type { NextConfig } from "next";
import SapioConfig from "@/lib/sapioConfig";


const invalidValues = [undefined, null, '']

const missingKeys = Object.entries(SapioConfig)
    .filter(([_, value]) => invalidValues.includes(value))
    .map(([key]) => key);

if (missingKeys.length > 0) {
    throw new Error(`Missing required config values: ${missingKeys.join(', ')}`);
}
const nextConfig: NextConfig = {
    reactStrictMode: true,
};

export default nextConfig;

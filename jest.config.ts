import type { Config } from 'jest';

// Set test environment variables before loading Next.js config
process.env.NEXT_PUBLIC_WIDGET_API_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_WIDGET_RECAPTCHA_KEY = 'test-recaptcha-key';
process.env.NEXT_PUBLIC_SAPIO_ASSISTANT_URL = 'http://localhost:3001';
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';

import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/test/example.test.[jt]sx',
    '**/test/CLI.test.[jt]sx',
    // Add other Jest-specific test patterns here
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/e2e/',
    'test/lib/CatchError.test.ts',
    'test/ConsoleBootLoader.test.tsx',
    'test/ConsoleLine.test.tsx',
    'test/GhostLine.test.tsx',
    'test/ThinkingLine.test.tsx',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);


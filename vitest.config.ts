/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    css: true,
    environmentOptions: {
      jsdom: {
        resources: 'usable'
      }
    },
    ui: true,
    logHeapUsage: true,
    reporters: ['default', 'html'],
    testTimeout: 10000,
    clearMocks: true,
    projects: [{
      extends: true,
      plugins: [],

    }, {
      extends: true,
      plugins: [
],

    }],
  }
});
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

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
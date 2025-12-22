import '@testing-library/jest-dom';

// Load test environment variables
process.env.NEXT_PUBLIC_WIDGET_API_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_WIDGET_RECAPTCHA_KEY = 'test-recaptcha-key';
process.env.NEXT_PUBLIC_SAPIO_ASSISTANT_URL = 'http://localhost:3001';
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';
process.env.NODE_ENV = 'test';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});


import '@testing-library/jest-dom';

// Load test environment variables
process.env.NEXT_PUBLIC_WIDGET_API_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_WIDGET_RECAPTCHA_KEY = 'test-recaptcha-key';
process.env.NEXT_PUBLIC_SAPIO_ASSISTANT_URL = 'http://localhost:3001';
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';

// Polyfill Headers for tests
if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers {
    private headers: Record<string, string> = {};
    
    constructor(init?: HeadersInit) {
      if (init) {
        if (init instanceof Headers) {
          this.headers = { ...init.headers };
        } else if (Array.isArray(init)) {
          init.forEach(([key, value]) => {
            this.headers[key.toLowerCase()] = value;
          });
        } else {
          Object.entries(init).forEach(([key, value]) => {
            this.headers[key.toLowerCase()] = value;
          });
        }
      }
    }
    
    get(name: string) {
      return this.headers[name.toLowerCase()] || null;
    }
    
    set(name: string, value: string) {
      this.headers[name.toLowerCase()] = value;
    }
  } as any;
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    ok: boolean;
    status: number;
    statusText: string;
    headers: Headers;
    
    constructor(public body: any, public init?: ResponseInit) {
      this.ok = init?.status ? init.status >= 200 && init.status < 300 : true;
      this.status = init?.status || 200;
      this.statusText = init?.statusText || 'OK';
      this.headers = new (global.Headers as any)(init?.headers || {});
    }
    
    async json() {
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body;
    }
    
    async text() {
      return typeof this.body === 'string' ? this.body : JSON.stringify(this.body);
    }
    
    clone() {
      return new Response(this.body, this.init);
    }
  } as any;
}

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


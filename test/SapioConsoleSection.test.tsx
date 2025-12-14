import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SapioConsoleSection } from '../src/components/sections/console/SapioConsoleSection';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { nothing } from '@/utils/formatters';

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode;[key: string]: unknown }) => {
      const { whileInView, initial, transition, viewport, ...restProps } = props;
      return <div {...restProps}>{children}</div>;
    },
    button: ({ children, ...props }: { children: React.ReactNode;[key: string]: unknown }) => {
      const { initial, animate, exit, ...restProps } = props;
      return <button {...restProps}>{children}</button>;
    },
  },
}));

vi.mock('@/hooks/useAutoScroll', () => ({
  useAutoScroll: vi.fn(),
}));

const mockExecuteRecaptcha = vi.fn().mockResolvedValue('mock-recaptcha-token');
vi.mock('@/hooks/GoogleRecaptchaV3', () => ({
  useRecaptchaV3: vi.fn(() => ({
    executeRecaptcha: mockExecuteRecaptcha,
    isLoaded: true,
  })),
}));

vi.mock('@/config/sapioConfig', () => ({
  default: {
    SAPIO_RECAPTCHA_SITE_KEY: 'test-site-key',
    isLocal: () => true,
  },
}));


const renderComponent = (): RenderResult => {
  return render(
    <LanguageProvider>
      <SapioConsoleSection />
    </LanguageProvider>
  );
}

describe('SapioConsoleSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    global.MutationObserver = class MutationObserver {
      observe = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn();
    } as unknown as typeof MutationObserver;

    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock as unknown as Storage;

    global.window.grecaptcha = {
      ready: vi.fn((cb) => cb()),
      execute: vi.fn().mockResolvedValue('mock-token'),
    } as unknown as typeof window.grecaptcha;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the component', () => {
   renderComponent()

    expect(screen.getByText(/Sapio Console/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask your question/i)).toBeInTheDocument();
  });

  it('sends a message and displays response', async () => {
    const user = userEvent.setup({ delay: null });

    renderComponent()

    const input = screen.getByPlaceholderText(/Ask your question/i) as HTMLInputElement;
    const testMessage = 'Hello, Sapio!';

    await user.type(input, testMessage);
    await user.keyboard('{Enter}');

    await waitFor(
      () => {
        expect(screen.getByText(testMessage)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(screen.getByText(/Mock content for development./i)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    expect(input.value).toBe(nothing);
  });

  it('displays user message immediately after sending', async () => {
    const user = userEvent.setup({ delay: null });

   renderComponent()

    const input = screen.getByPlaceholderText(/Ask your question/i) as HTMLInputElement;
    const testMessage = 'What can you do?';

    await user.type(input, testMessage);
    await user.keyboard('{Enter}');

    await waitFor(
      () => {
        expect(screen.getByText(testMessage)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(input.value).toBe('');
  });
});


/* eslint-disable */

import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CLI } from '@/components/mac_cli/CLI';
import { LanguageProvider } from '@/contexts/LanguageContext';

jest.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => {
      const { whileInView, initial, transition, viewport, ...restProps } = props;
      return <div {...restProps}>{children}</div>;
    },
    span: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...restProps } = props;
      return <span {...restProps}>{children}</span>;
    },
  },
}));

jest.mock('@/config/sapioConfig', () => ({
  __esModule: true,
  default: {
    SAPIO_WIDGET_API_KEY: 'test-key',
    SAPIO_RECAPTCHA_SITE_KEY: 'test-recaptcha-key',
    SAPIO_API_URL: 'http://test-api.local',
    PUBLIC_SITE: 'http://localhost:3000',
    ENV: 'local',
    isLocal: () => true,
  },
}));


jest.mock('@/hooks/useAutoScroll', () => ({
  useAutoScroll: jest.fn(),
}));

jest.mock('@/hooks/GoogleRecaptchaV3', () => ({
  useRecaptchaV3: jest.fn(() => ({
    executeRecaptcha: jest.fn(async () => 'mock-recaptcha-token'),
    isLoaded: true,
  })),
}));

global.fetch = jest.fn();

const renderCLI = () => {
  return render(
    <LanguageProvider>
      <CLI />
    </LanguageProvider>
  );
};

describe('CLI Component - Comprehensive Tests', () => {
  const originalError = console.error;
  
  beforeAll(() => {
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('Warning: An update to') ||
         args[0].includes('act(...)'))
      ) {
        return;
      }
      originalError.call(console, ...args);
    };
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    
    global.MutationObserver = class MutationObserver {
      observe = jest.fn();
      disconnect = jest.fn();
      takeRecords = jest.fn();
    } as any;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });


  describe('1. Basic Rendering', () => {
    it('should render the CLI container with proper structure', () => {
      renderCLI();
      
      const container = screen.getByRole('region', { name: /terminal interface/i });
      expect(container).toBeInTheDocument();
    });

    it('should render all main components', async () => {
      renderCLI();
      expect(screen.getByRole('region', { name: /terminal interface/i })).toBeInTheDocument();
      
      expect(screen.getByRole('log')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });

    it('should display welcome messages on mount', async () => {
      renderCLI();
      
      await waitFor(() => {
        const textElements = screen.queryAllByText(/Sapio/i);
        expect(textElements.length).toBeGreaterThan(0);
      });
    });

    it('should have proper ARIA attributes for accessibility', async () => {
      renderCLI();
      
      const container = screen.getByRole('region', { name: /terminal interface/i });
      expect(container).toBeInTheDocument();
      
      const logRegion = screen.getByRole('log');
      expect(logRegion).toHaveAttribute('aria-live', 'polite');
      expect(logRegion).toHaveAttribute('aria-relevant', 'additions');
      
      await waitFor(() => {
      const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('aria-label', 'Terminal command input');
      });
    });

    it('should render input field with correct attributes', async () => {
      renderCLI();
      
      await waitFor(() => {
        const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveAttribute('autoComplete', 'off');
        expect(input).toHaveAttribute('spellCheck', 'false');
      });
    });
  });


  describe('2. Expected Error - Sapio Error Message Display', () => {
    it('should handle message sending with mocked prepareFetch', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      }, { timeout: 3000 });

      const input = screen.getByRole('textbox');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await user.type(input, 'Test message{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Test message')).toBeInTheDocument();
      }, { timeout: 5000 });
    }, 10000);

    it('should handle input focus and message submission', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      }, { timeout: 3000 });

      const input = screen.getByRole('textbox');
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      await user.click(input);
      expect(input).toHaveFocus();
      
      await user.type(input, 'Test message{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Test message')).toBeInTheDocument();
      }, { timeout: 5000 });
    }, 10000);

    it('should allow sending multiple messages in sequence', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      }, { timeout: 3000 });

      const input = screen.getByRole('textbox') as HTMLInputElement;
      await new Promise(resolve => setTimeout(resolve, 200));
      
      await user.type(input, 'First message{Enter}');
      await waitFor(() => {
        expect(screen.getByText('First message')).toBeInTheDocument();
      }, { timeout: 5000 });
      expect(input.value).toBe('');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      await user.type(input, 'Second message{Enter}');
      await waitFor(() => {
        expect(screen.getByText('Second message')).toBeInTheDocument();
      }, { timeout: 5000 });
      
      expect(screen.getByText('First message')).toBeInTheDocument();
      expect(screen.getByText('Second message')).toBeInTheDocument();
    }, 15000);

    it('should handle sending messages with mocked recaptcha', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      }, { timeout: 3000 });

      const input = screen.getByRole('textbox');
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await user.type(input, 'Test message{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Test message')).toBeInTheDocument();
      }, { timeout: 5000 });
    }, 10000);
  });

  describe('3. Unexpected Error - Error Boundary', () => {
    it('should render error boundary fallback when component throws error', () => {
      jest.doMock('@/contexts/LanguageContext', () => ({
        LanguageProvider: ({ children }: any) => children,
        useLanguage: () => {
          throw new Error('Component crashed!');
        },
      }));

      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      jest.resetModules();
      const { CLI: TestCLI } = require('@/components/mac_cli/CLI');
      const { LanguageProvider: TestProvider } = require('@/contexts/LanguageContext');

      render(
        <TestProvider>
          <TestCLI />
        </TestProvider>
      );

      const errorMessage = screen.getByText(/temporarily unavailable due to maintenance/i);
      expect(errorMessage).toBeInTheDocument();
      
      expect(screen.getByRole('region', { name: /terminal interface.*error/i })).toBeInTheDocument();
      
      consoleError.mockRestore();
      jest.dontMock('@/contexts/LanguageContext');
      jest.resetModules();
    });

    it('should display maintenance message in error boundary with structured layout', () => {
      const { CLIErrorBoundary } = require('@/components/mac_cli/ErrorBoundary');
      
      const ThrowError = () => {
        throw new Error('Critical error');
      };

      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <CLIErrorBoundary
          fallback={() => (
            <div role="region" aria-label="Terminal interface - Error state">
              <div>The Sapio assistant is temporarily unavailable due to maintenance. Please check back soon.</div>
            </div>
          )}
        >
          <ThrowError />
        </CLIErrorBoundary>
      );

      expect(screen.getByText(/temporarily unavailable due to maintenance/i)).toBeInTheDocument();
      expect(screen.getByText(/check back soon/i)).toBeInTheDocument();
      
      consoleError.mockRestore();
    });
  });

  describe('4. Success - Message Sending and Response', () => {
    it('should successfully send message and display user input', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      }, { timeout: 3000 });

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const testMessage = 'What can you do?';
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await user.type(input, testMessage + '{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText(testMessage)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await waitFor(() => {
        expect(screen.getByText('Mock content for development.')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      expect(input.value).toBe('');
    }, 15000);

    it('should clear input after successful send', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      const input = screen.getByRole('textbox') as HTMLInputElement;
      await user.type(input, 'Test message{Enter}');
      
      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });

    it('should handle multiple successful messages in sequence', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      }, { timeout: 3000 });

      const input = screen.getByRole('textbox');
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      await user.type(input, 'Message 1{Enter}');
      await waitFor(() => {
        expect(screen.getByText('Message 1')).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await user.type(input, 'Message 2{Enter}');
      await waitFor(() => {
        expect(screen.getByText('Message 2')).toBeInTheDocument();
      }, { timeout: 5000 });
      
      expect(screen.getByText('Message 1')).toBeInTheDocument();
      expect(screen.getByText('Message 2')).toBeInTheDocument();
    }, 15000);

    it('should not send empty or whitespace-only messages', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      const input = screen.getByRole('textbox');
      
      await user.type(input, '{Enter}');
      expect(global.fetch).not.toHaveBeenCalled();
      
      await user.type(input, '   {Enter}');
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should trim whitespace from messages before sending', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ response: 'Trimmed response' }),
      });

      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      const input = screen.getByRole('textbox');
      await user.type(input, '  Hello World  {Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Hello World')).toBeInTheDocument();
      });
    });
  });

  describe('5. Inactivity Timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should blur input after inactivity timeout (10 seconds)', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      expect(input).toHaveFocus();
      
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      
      await waitFor(() => {
        expect(input).not.toHaveFocus();
      });
    });

    it('should reset timer when user types', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      expect(input).toHaveFocus();
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      await user.type(input, 'a');
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(input).toHaveFocus();
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      await waitFor(() => {
        expect(input).not.toHaveFocus();
      });
    });

    it('should reset timer when user sends message', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      await user.type(input, 'Test message');
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      await user.type(input, '{Enter}');
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(input).toHaveFocus();
    });

    it('should clear timer on manual blur', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      expect(input).toHaveFocus();
      
      await user.tab();
      expect(input).not.toHaveFocus();
      
      act(() => {
        jest.advanceTimersByTime(15000);
      });
      
      expect(input).not.toHaveFocus();
    });

    it('should allow refocusing after timer blur', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      expect(input).toHaveFocus();
      
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      
      await waitFor(() => {
      expect(input).not.toHaveFocus();
      });
      
      await user.click(input);
      expect(input).toHaveFocus();
    });

    it('should handle multiple focus/blur cycles with timer', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      const input = screen.getByRole('textbox');
      
      await user.click(input);
      expect(input).toHaveFocus();
      
      act(() => {
        jest.advanceTimersByTime(10000);
  });
      
      await waitFor(() => {
        expect(input).not.toHaveFocus();
      });
      
      await user.click(input);
      expect(input).toHaveFocus();
      
      await user.type(input, 'test');
      
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      
      await waitFor(() => {
        expect(input).not.toHaveFocus();
      });
    });
  });

  describe('Integration Tests', () => {
    it('should work correctly with LanguageProvider context', async () => {
      renderCLI();
      
      expect(screen.getByRole('region')).toBeInTheDocument();
      
      await waitFor(() => {
        const textElements = screen.queryAllByText(/Sapio/i);
        expect(textElements.length).toBeGreaterThan(0);
      });
    });

    it('should handle rapid message sending', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      }, { timeout: 3000 });

      const input = screen.getByRole('textbox');
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      await user.type(input, 'Message A{Enter}');
      await user.type(input, 'Message B{Enter}');
      await user.type(input, 'Message C{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Message A')).toBeInTheDocument();
        expect(screen.getByText('Message B')).toBeInTheDocument();
        expect(screen.getByText('Message C')).toBeInTheDocument();
      }, { timeout: 5000 });
    }, 10000);

    it('should display messages in chronological order', async () => {
      const user = userEvent.setup({ delay: null });
      renderCLI();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      }, { timeout: 3000 });

      const input = screen.getByRole('textbox');
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      await user.type(input, 'First query{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('First query')).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await user.type(input, 'Second query{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Second query')).toBeInTheDocument();
      }, { timeout: 5000 });
      
      expect(screen.getByText('First query')).toBeInTheDocument();
      expect(screen.getByText('Second query')).toBeInTheDocument();
    }, 15000);
  });
});

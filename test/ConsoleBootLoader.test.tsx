import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ConsoleBootLoader } from '../src/components/sections/console/ConsoleBootLoader';

// Mock the translations with the correct structure
const mockTranslations = {
  en: {
    home: {
      sapioConsole: {
        bootLogs: [
          '>> Initializing core systems...',
          '>> Loading modules...',
          '>> System ready',
        ],
      },
    },
  },
  // Add other languages if needed
};

describe('ConsoleBootLoader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('displays boot logs with animation', async () => {
    const { unmount } = render(
      <ConsoleBootLoader
        language="en"
        translations={mockTranslations}
      />
    );

    // Wait for initial render
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    // Initially, no logs should be visible (first interval hasn't fired yet)
    expect(screen.queryByText('>> Initializing core systems...')).not.toBeInTheDocument();

    // Fast-forward time to show first log (240ms interval)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(240);
    });
    expect(screen.getByText('>> Initializing core systems...')).toBeInTheDocument();

    // Fast-forward to show second log
    await act(async () => {
      await vi.advanceTimersByTimeAsync(240);
    });
    expect(screen.getByText('>> Loading modules...')).toBeInTheDocument();

    // Fast-forward to show third log
    await act(async () => {
      await vi.advanceTimersByTimeAsync(240);
    });
    expect(screen.getByText('>> System ready')).toBeInTheDocument();

    // Check that all logs are displayed
    const logs = screen.getAllByText(/>>/);
    expect(logs).toHaveLength(3);

    // Clean up
    unmount();
    vi.clearAllTimers();
  });
});

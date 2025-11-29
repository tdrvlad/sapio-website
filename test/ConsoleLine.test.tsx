import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConsoleLine from '../src/components/sections/console/ConsoleLine';

describe('ConsoleLine', () => {
  const defaultProps = {
    message: {
      id: '1',
      role: 'user' as const,
      content: 'Test message',
    },
    accent: 'user',
    userLabel: 'You',
    accentColor: '#0066ff',
    isAnimating: false,
  };

  it('renders message content', () => {
    render(<ConsoleLine {...defaultProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<ConsoleLine {...defaultProps} />);
    const element = screen.getByText('Test message');
    // Check for the expected class name
    expect(element).toHaveClass('text-white/85');
  });

  it('shows typing animation when isAnimating is true', () => {
    render(
      <ConsoleLine
        {...defaultProps}
        isAnimating={true}
        animatedText="Typing..."
      />
    );
    expect(screen.getByText('Typing...')).toBeInTheDocument();
  });
});

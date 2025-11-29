import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThinkingLine from '../src/components/sections/console/ThinkingLine';

describe('ThinkingLine', () => {
  it('renders the thinking indicator', () => {
    render(
      <ThinkingLine
        label="AI"
        text="Thinking..."
        accentColor="#0066ff"
      />
    );
    
    expect(screen.getByText('Thinking...')).toBeInTheDocument();
    expect(screen.getByText('[ai]')).toBeInTheDocument();
    
    // Check for the animated dots container
    const dotsContainer = screen.getByText('Thinking...').nextElementSibling;
    expect(dotsContainer).toHaveClass('flex');
    expect(dotsContainer?.querySelectorAll('span').length).toBe(3);
  });

  it('applies the correct accent color', () => {
    render(
      <ThinkingLine
        label="AI"
        text="Thinking..."
        accentColor="#ff0000"
      />
    );
    
    const label = screen.getByText('[ai]');
    expect(label).toHaveStyle({ color: '#ff0000' });
  });
});

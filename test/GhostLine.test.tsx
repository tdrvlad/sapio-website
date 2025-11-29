import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GhostLine from '../src/components/sections/console/GhostLine';

describe('GhostLine', () => {
  it('renders the provided text', () => {
    render(<GhostLine text="Test ghost text" phase="typing" userLabel="User" />);
    expect(screen.getByText('Test ghost text')).toBeInTheDocument();
  });

  it('applies correct styling based on phase', () => {
    const { container } = render(
      <GhostLine text="Test" phase="typing" userLabel="User" />
    );
    
    // Check for the expected text content
    const textElement = screen.getByText('Test');
    expect(textElement).toBeInTheDocument();
    
    // Check the text element has the expected border class
    expect(textElement).toHaveClass('border-r');
    expect(textElement).toHaveClass('border-white/40');
    expect(textElement).toHaveClass('pr-1');
    
    // Check the container has the expected classes
    const containerElement = container.firstChild;
    expect(containerElement).toHaveClass('text-[15px]');
    expect(containerElement).toHaveClass('leading-7');
    expect(containerElement).toHaveClass('opacity-70'); // typing phase opacity
  });

  it('displays user label correctly', () => {
    render(<GhostLine text="Test" phase="typing" userLabel="CustomUser" />);
    expect(screen.getByText('[customuser]')).toBeInTheDocument();
  });
});

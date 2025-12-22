import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Example component for testing
function ExampleComponent({ text }: { text: string }) {
  return <div data-testid="example">{text}</div>;
}

describe('Example Jest Test', () => {
  it('should render the component', () => {
    render(<ExampleComponent text="Hello Jest!" />);
    
    const element = screen.getByTestId('example');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello Jest!');
  });

  it('should handle different props', () => {
    render(<ExampleComponent text="Different text" />);
    
    expect(screen.getByText('Different text')).toBeInTheDocument();
  });
});


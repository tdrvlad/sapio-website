import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class CLIErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('CLI Error Boundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      // Default fallback UI
      return (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #ff4444',
            borderRadius: '8px',
            color: '#ff4444',
            fontFamily: 'monospace',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#ff4444' }}>
            ⚠️ CLI Error
          </h3>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
            {this.state.error.message}
          </p>
          <button
            onClick={this.resetError}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff4444',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}



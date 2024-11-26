import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // Log error details to an external monitoring service
    if (process.env.REACT_APP_ERROR_MONITORING_URL) {
      fetch(process.env.REACT_APP_ERROR_MONITORING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.toString(),
          stack: errorInfo.componentStack,
        }),
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary glass-card">
          <h2>Oops! Something went wrong. 🚨</h2>
          <p>Error: {this.state.error?.message || 'Unknown Error'}</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo?.componentStack}
          </details>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

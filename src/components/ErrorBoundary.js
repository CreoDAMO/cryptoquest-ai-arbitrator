import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, lastLogged: 0 };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // Throttle logging to avoid overwhelming the monitoring service
    const now = Date.now();
    if (now - this.state.lastLogged > 5000) {
      this.setState({ lastLogged: now });

      if (process.env.REACT_APP_ERROR_MONITORING_URL) {
        fetch(process.env.REACT_APP_ERROR_MONITORING_URL, {
          method: '"POST"',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: error.toString(),
            stack: errorInfo.componentStack,
            metadata: {
              url: window.location.href,
              userAgent: navigator.userAgent,
              timestamp: new Date().toISOString(),
            },
          }),
        }).catch(console.error); // Handle fetch errors
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary glass-card">
          <h2>Oops! Something went wrong. 🚨</h2>
          <p>Error: {this.state.error?.message || '"Unknown Error"'}</p>
          <details style={{ whiteSpace: '"pre-wrap"' }}>
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

// src/components/ErrorBoundary.jsx

import React from 'react';

/**
 * Error Boundary Component
 * Catches errors in child components and shows fallback UI
 * 
 * Note: Must be a class component (React requirement)
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    // Catch errors during rendering
    static getDerivedStateFromError(error) {
        // Update state so next render shows fallback UI
        return { hasError: true };
    }

    // Log error details
    componentDidCatch(error, errorInfo) {
        // Log to console
        console.error('Error caught by boundary:', error);
        console.error('Error info:', errorInfo);

        // Update state with error details
        this.setState({
            error,
            errorInfo,
        });

        // TODO: Log to error reporting service (Sentry, LogRocket, etc.)
        // logErrorToService(error, errorInfo);
    }

    // Reset error boundary
    resetError = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div
                    style={{
                        padding: '2rem',
                        maxWidth: '600px',
                        margin: '2rem auto',
                        background: '#f8d7da',
                        border: '2px solid #f5c6cb',
                        borderRadius: '8px',
                        color: '#721c24',
                    }}
                >
                    <h2 style={{ marginBottom: '1rem' }}>
                        ⚠️ Oops! Something went wrong
                    </h2>

                    <p style={{ marginBottom: '1rem' }}>
                        We're sorry for the inconvenience. The application encountered an error.
                    </p>

                    {/* Show error in development */}
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{ marginBottom: '1rem' }}>
                            <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                                Error details (development only)
                            </summary>
                            <div
                                style={{
                                    padding: '1rem',
                                    background: '#fff',
                                    borderRadius: '4px',
                                    fontSize: '0.85rem',
                                    overflow: 'auto',
                                }}
                            >
                                <strong>Error:</strong>
                                <pre style={{ whiteSpace: 'pre-wrap' }}>
                                    {this.state.error.toString()}
                                </pre>

                                {this.state.errorInfo && (
                                    <>
                                        <strong>Component Stack:</strong>
                                        <pre style={{ whiteSpace: 'pre-wrap' }}>
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    </>
                                )}
                            </div>
                        </details>
                    )}

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={this.resetError}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#721c24',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Try Again
                        </button>

                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Reload Page
                        </button>
                    </div>

                    {/* Help text */}
                    <p
                        style={{
                            marginTop: '1rem',
                            fontSize: '0.9rem',
                            opacity: 0.8,
                        }}
                    >
                        If this problem persists, please contact support or try again later.
                    </p>
                </div>
            );
        }

        // No error, render children normally
        return this.props.children;
    }
}

export default ErrorBoundary;
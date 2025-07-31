import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, errorInfo) {
    // You can log error info here if needed
    // Parameters removed to resolve linter errors
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          <AlertTitle>Something went wrong.</AlertTitle>
          {this.state.error && this.state.error.toString()}
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

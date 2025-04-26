import { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error('React Error Boundary caught an error:', error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error Boundary Details:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/error" replace />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

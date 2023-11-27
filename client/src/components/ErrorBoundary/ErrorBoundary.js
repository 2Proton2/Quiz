// ErrorBoundary.js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary :', error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;

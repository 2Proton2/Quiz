// ErrorPage.js
import React from 'react';
import './css/Error.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h2>Oops! Something went wrong.</h2>
        <p>We're sorry, but it seems like there's an issue. Please try again later.</p>
      </div>
    </div>
  );
};

export default ErrorPage;

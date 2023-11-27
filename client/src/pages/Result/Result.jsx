import React from 'react';
import './css/Result.css'; // Import your CSS file
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Result = (props) => {
  const navigateTo = useNavigate();

  return (
    <div className="container">
      <h1>Result</h1>
      <div className="result-info">
        <p>Your score is <span className="score">{props.result}</span>.</p>
        <p>Login again to retake the test.</p>
      </div>
      <button className="retake-button" onClick={() => navigateTo('/login')}>
        Re-take
      </button>
    </div>
  );
};

export default Result;

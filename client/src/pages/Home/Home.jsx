import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

const Home = () => {
  return (
    <div className="container">
      <h2>Welcome to the Quiz App</h2>
      <div className="buttons-container">
        <Link to="/signin" className="button">
          Sign Up
        </Link>
        <Link to="/login" className="button">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Home;

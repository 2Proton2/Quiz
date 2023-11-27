import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './css/Start.css';

const StartPage = () => {
  const location = useLocation();
  const queryParams =  new URLSearchParams(location.search);
  const id = queryParams.get('userid');
  console.log('id => ',id);
  const navigateTo = useNavigate();
  const navigatePage = () => {
    if(id){
      console.log(`url /game?id=${id}`)
      navigatePage(`/game?id=${id}`);
    }
  }
  
  return (
    <div className="container">
      <h2>Ready to Start the Quiz?</h2>
      <Link to={`/game?id=${id}`} className="start-button">
        Start Quiz
      </Link>
    </div>
  );
};

export default StartPage;

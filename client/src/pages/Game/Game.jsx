import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './css/Game.css';
import Result from '../Result/Result';

import userService from '../../service/user.service';

const Dashboard = () => {
  const location = useLocation();
  const [userId, setId] = useState();
  const navigateTo = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const queryParams = new URLSearchParams(location.search);
  const [resultFlag, setResult] = useState(false);
  const id = queryParams.get('id');

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [equation, setEquation] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);

  const fetchDetails = async (id) => {
    let details = await userService.getUserData(`/user/${id}`);
    return details.data.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setId(id);
        let data = await fetchDetails(id);
        setUserDetails(data);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (currentQuestion <= 3) {
      generateQuestion();
      startTimer();
    } else {
      // Display results
      setResult(true)
    //   navigateTo(`/result?selectedAnswer=${selectedAnswer}&isCorrect=${isCorrect}&score=${score}`)
      console.log('Results:', { selectedAnswer, isCorrect, score });
    }
  }, [currentQuestion]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operators = ['+', '-', 'x', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    setEquation(`${num1} ${operator} ${num2}`);

    const correctAnswer = calculateAnswer(num1, num2, operator);
    const shuffledOptions = shuffleOptions(generateOptions(correctAnswer));
    setOptions(shuffledOptions);
  };

  const calculateAnswer = (num1, num2, operator) => {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case 'x':
        return num1 * num2;
      case '/':
        return Math.round((num1 / num2) * 10) / 10;
      default:
        return 0;
    }
  };

  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const randomOption = Math.floor(Math.random() * 20);
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options;
  };

  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      // Timeout, user didn't select an answer
      handleAnswer(null);
    }, 30000);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = calculateAnswer(
      parseInt(equation.split(' ')[0]),
      parseInt(equation.split(' ')[2]),
      equation.split(' ')[1]
    );
    const isCorrect = answer === correctAnswer;
    setIsCorrect(isCorrect);
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="profile-section">
          <img src={userDetails && userDetails.profilePicture} alt="Profile" className="profile-picture" />
          <span className="user-name"><b>Candidate Name :</b> {userDetails && userDetails.firstName}</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content card">
        <h2>Quiz Section</h2>
        <div className="question">
          <p>{equation}</p>
          <div className="timer">{timer}s</div>
        </div>
        <div className="options">
          {options.map((option) => (
            <button key={option} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer !== null && (
          <div className="result">{isCorrect ? 'Correct!' : 'Incorrect!'}</div>
        )}
      </div>
      {
        (resultFlag) ? <Result result={score}/> : <></>
      }
    </div>
  );
};

export default Dashboard;

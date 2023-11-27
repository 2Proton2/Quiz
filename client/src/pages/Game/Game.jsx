import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/Game.css'; // Add your styling for the dashboard

import userService from '../../service/user.service';

const Dashboard = () => {
  const location = useLocation();
  const [userId, setId] = useState();
  const [userDetails, setUserDetails] = useState();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

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

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="profile-section">
          <img src={userDetails && userDetails.profilePicture} alt="Profile" className="profile-picture" />
          <span className="user-name">{userDetails && userDetails.firstName}</span>
        </div>
        {/* Add more navigation links or components as needed */}
        {/* <a href="/dashboard">Dashboard</a> */}
        {/* <a href="/settings">Settings</a> */}
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h2>Quiz Section</h2>
        {/* Add your quiz question and answer components here */}
      </div>
    </div>
  );
};

export default Dashboard;

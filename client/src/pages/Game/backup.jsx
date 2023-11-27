import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/Game.css';
import userService from '../../service/user.service';

const GamePage = () => {
  const location = useLocation();
  const [userId, setId] = useState();
  const [userDetails, setUserDetails] = useState();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  console.log('id Game ss => ', id);

  const fetchDetails = async (id) => {
    console.log(`fetchDetail function => , /user/${id}`);
    let details = await userService.getUserData(`/user/${id}`);
    return details.data.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setId(id)
        let data = await fetchDetails(id);
        setUserDetails(data);
      }
    };

    fetchData();
  }, [id]);

  console.log('userDetails => ', userDetails);

  return (
    <>
      <div className="container">Game</div>
      <div>{userId ? userId : 'nothing'}</div>
      <div>{(userDetails && userDetails.firstName) ? userDetails.firstName : 'nothing'}</div>
      <div>{(userDetails && userDetails.profilePicture) ? <img src={userDetails.profilePicture} alt="image"/> : 'nothing'}</div>
    </>
  );
};

export default GamePage;

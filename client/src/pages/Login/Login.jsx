import React, { useReducer, useState } from 'react';
import './css/Login.css';
import axios from '../../service/axios/axio.service';
import { setAuth } from '../../store/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userService from '../../service/user.service';

const Login = () => {
  const navigateTo = useNavigate();
  const auth = useSelector((state) => {
    return state.users.isAuthenticated
  })
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Implement your login logic here
      console.log('Form is valid. Submitting...', formData);
      console.log('before dispatching => ', auth)
      dispatch(setAuth(true));
      console.log('after dispatching => ', auth);
      let result = await userService.loginService('/login', formData);

      if(result.status === 200){
        navigateTo(`/start?userid=${result.data.data}`)
      }
      console.log('result => ',result)
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

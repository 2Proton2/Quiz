import React, { useState } from 'react';
import './css/Sign.css';
import axios from '../../service/axios/axio.service';
import Notification from '../../components/notification/Notification';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: '',
    birthdate: '',
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      // Handle image file conversion to base64
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result,
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      // Handle other input changes
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.profilePicture.trim()) {
      newErrors.profilePicture = 'Profile Picture is required';
    }

    if (!formData.birthdate.trim()) {
      newErrors.birthdate = 'Birthdate is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      let result = await axios.post('/sign-in', formData)

      if(result.status === 201){
        Notification(toast, 'success', 'POSITION', 'BOTTOM_RIGHT', "Registration done successfully");
        Notification(toast, 'info', 'POSITION', 'BOTTOM_RIGHT', "Kindly please login again");
        navigateTo(`/login`);
      }
      else{
        Notification(toast, 'error', 'POSITION', 'BOTTOM_RIGHT', "Something went wrong! Invalid request.");
      }
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <div className="error-message">{errors.firstName}</div>
          )}
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
            <div className="error-message">{errors.lastName}</div>
          )}
        </div>

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
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            accept="image/*" // Specify the accepted file types (images in this case)
            required
          />
          {errors.profilePicture && (
            <div className="error-message">{errors.profilePicture}</div>
          )}
        </div>

        <div className="input-group">
          <label>Birthdate</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
          {errors.birthdate && (
            <div className="error-message">{errors.birthdate}</div>
          )}
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && (
            <div className="error-message">{errors.phoneNumber}</div>
          )}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;

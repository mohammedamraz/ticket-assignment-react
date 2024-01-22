import React, { useState } from 'react';
import '../styles/ticket-rise.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar';
import api from '../services/api';

const SupportAgent = () => {
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [agents, setAgents] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleSnackbar = (message, type) => {
    setSnackbar({
      open: true,
      message,
      type,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.description) {
      handleSnackbar('Please fill in all the fields', 'error');
      return;
    }

    if (formData.phone.length !== 10) {
      handleSnackbar('Phone number should be 10 digits', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      handleSnackbar('Invalid email format', 'error');
      return;
    }

    try {
      const data = await api.createAgent(formData);
      handleSnackbar('Agent created successfully', 'success');

      setFormData(initialFormData);
    } catch (error) {
      console.error('Create Agent Error:', error.message);
      handleSnackbar('Failed to create agent', 'error');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ textAlign: 'center' }}>Register an Agent</h2>
        <div style={{ textAlign: '-webkit-center' }}>
          <form onSubmit={handleSubmit} style={{ width: '80%' }}>
            <label className="form-label">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                maxLength="10"
              />

            </label>
            <label className="form-label">
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <button type="submit" className="form-button">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default SupportAgent;

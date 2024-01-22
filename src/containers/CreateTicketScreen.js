import React, { useState } from 'react';
import '../styles/ticket-rise.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar';
import api from '../services/api';

const CreateTicketScreen = () => {
  const initialFormData = {
    topic: '',
    description: '',
    severity: '',
    type: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tickets, setTickets] = useState([]);
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

    if (!formData.topic || !formData.description || !formData.severity || !formData.type) {
      handleSnackbar('Please fill in all the fields', 'error');
      return;
    }

    try {
      const data = await api.createTicket(formData);
      handleSnackbar('Ticket created successfully', 'success');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Create Ticket Error:', error.message);
      handleSnackbar('Failed to create ticket', 'error');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ textAlign: 'center' }}>Create a Ticket</h2>
        <div style={{ textAlign: '-webkit-center' }}>
          <form onSubmit={handleSubmit} style={{ width: '80%' }}>
            <label className="form-label">
              Topic:
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="form-input"
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
            <label className="form-label">
              Severity:
              <input
                type="text"
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Type:
              <input
                type="text"
                name="type"
                value={formData.type}
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

export default CreateTicketScreen;

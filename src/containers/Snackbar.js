import React from 'react';
import '../styles/Snackbar.css';

const Snackbar = ({ open, message, type, onClose }) => {
  return (
    <div className={`snackbar ${type} ${open ? 'open' : ''}`}>
      <div className="snackbar-message">{message}</div>
      <div className="snackbar-close" onClick={onClose}>
        &times;
      </div>
    </div>
  );
};

export default Snackbar;
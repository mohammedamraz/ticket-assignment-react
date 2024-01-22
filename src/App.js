import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateTicketScreen from './containers/CreateTicketScreen';
import CreateAgentScreen from './containers/CreateAgentScreen';
import DisplayDataScreen from './containers/DisplayDataScreen';
import './App.css'
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <h2><Link to="/create-ticket">Create Ticket</Link></h2>
            <h2><Link to="/create-agent">Create Agent</Link></h2>
            <h2><Link to="/dashboard">Dashboard</Link></h2>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/create-ticket" element={<CreateTicketScreen />} />
          <Route path="/create-agent" element={<CreateAgentScreen />} />
          <Route path="/dashboard" element={<DisplayDataScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
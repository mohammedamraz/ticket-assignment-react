const apiUrl = 'http://localhost:3000/api/';

const api = {
  createTicket: async (formData) => {
    try {
      const response = await fetch(`${apiUrl}tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Create Ticket Error:', error.message);
      throw error;
    }
  },

  createAgent: async (formData) => {
    try {
      const response = await fetch(`${apiUrl}agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Create Agent Error:', error.message);
      throw error;
    }
  },

  getTickets: async () => {
    try {
      const response = await fetch(`${apiUrl}tickets`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch Tickets Error:', error.message);
      throw error;
    }
  },

  getAgents: async () => {
    try {
      const response = await fetch(`${apiUrl}agents`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch Agents Error:', error.message);
      throw error;
    }
  },

  getAgentById: async (agentId) => {
    try {
      const response = await fetch(`${apiUrl}agents/${agentId}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch Agents Error:', error.message);
      throw error;
    }
  },

  updateTicketStatus: async (ticketId) => {
    try {
      const response = await fetch(`${apiUrl}tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update Ticket Status Error:', error.message);
      throw error;
    }
  },

  updateAgentStatus: async (agentId) => {
    try {
      const response = await fetch(`${apiUrl}agents/${agentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update Ticket Status Error:', error.message);
      throw error;
    }
  },


};

export default api;
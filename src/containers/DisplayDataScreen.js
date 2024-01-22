import '../styles/ticket-rise.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
const PAGE_SIZE = 10;


const Dashboard = () => {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [tickets, setTickets] = useState([]);
    // pagination and sorting
    const [currentTicketPage, setCurrentTicketPage] = useState(1);
    const [currentAgentPage, setCurrentAgentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [ticketSortOrder, setTicketSortOrder] = useState('asc');

    useEffect(() => {
        const fetchTicketsAndAgents = async () => {
            try {
                const ticketsData = await api.getTickets();
                const agentsData = await api.getAgents();

                const adjustedTickets = ticketsData.map((ticket, index) => ({
                    ...ticket,
                    ids: index + 1,
                }));
                const adjustedAgents = agentsData.map((agent, index) => ({
                    ...agent,
                    ids: index + 1,
                }));
                setTickets(adjustedTickets);
                setAgents(adjustedAgents);
            } catch (error) {
                console.error('Fetch Tickets and Agents Error:', error.message);
            }
        };

        fetchTicketsAndAgents();
    }, []);

    // Pagination for tickets and agents
    const startTicketIndex = (currentTicketPage - 1) * PAGE_SIZE;
    const endTicketIndex = startTicketIndex + PAGE_SIZE;
    const displayedTickets = tickets.slice(startTicketIndex, endTicketIndex);

    const startAgentIndex = (currentAgentPage - 1) * PAGE_SIZE;
    const endAgentIndex = startAgentIndex + PAGE_SIZE;
    const displayedAgents = agents.slice(startAgentIndex, endAgentIndex);



    // updating status of tickets and agents
    const handleToggleOption = async (ticketId) => {
        try {
            const updatedTicket = await api.updateTicketStatus(ticketId);

            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket.id === ticketId ? { ...ticket, status: updatedTicket.status, resolvedOn: updatedTicket.status === 'completed' ? new Date().toISOString() : null, } : ticket
                )
            );
        } catch (error) {
            console.error('Update Ticket Status Error:', error.message);

        }
    };

    const handleAgentKanbanOption = async (agentId) => {
        try {
            const updatedAgent = await api.updateAgentStatus(agentId);
            setAgents((prevAgents) =>
                prevAgents.map((agent) =>
                    agent.id === agentId ? { ...agent, active: updatedAgent.active } : agent
                )
            );
        } catch (error) {
            console.error('Update Agent Status Error:', error.message);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        return date.toLocaleDateString('en-US', options);
    };

    const [ticketAssignees, setTicketAssignees] = useState({});


    useEffect(() => {
        const fetchTicketAssignees = async () => {
            try {
                const assignees = {};

                await Promise.all(
                    tickets.map(async (ticket) => {
                        if (ticket.assignedTo) {
                            const agent = await api.getAgentById(ticket.assignedTo);
                            assignees[ticket.id] = agent.name;
                        }
                    })
                );

                setTicketAssignees(assignees);
            } catch (error) {
                console.error('Fetch Ticket Assignees Error:', error.message);
            }
        };

        fetchTicketAssignees();
    }, [tickets]);

    // function for sorting 
    const handleSort = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
        setAgents((prevAgents) =>
            [...prevAgents].sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.active - b.active;
                } else {
                    return b.active - a.active;
                }
            })
        );
    };

    const handleTicketSort = () => {
        setTicketSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));

        setTickets((prevTickets) =>
            [...prevTickets].sort((a, b) => {
                if (ticketSortOrder === 'asc') {
                    return a.status.localeCompare(b.status);
                } else {
                    return b.status.localeCompare(a.status);
                }
            })
        );
    };


    return (
        <div className="dashboard-container">
            <h2 style={{ textAlign: 'center' }}>List Of Tickets</h2>
            <button onClick={handleTicketSort}>
                Sort by Status {ticketSortOrder === 'asc' ? '▲' : '▼'}
            </button>
            <table className="ticket-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Topic</th>
                        <th>Description</th>
                        <th>Severity</th>
                        <th>Type</th>
                        <th>Assigned To</th>
                        <th>Resolved On</th>
                        <th>Status</th>
                        <th>Date Created</th>


                    </tr>
                </thead>
                <tbody>
                    {displayedTickets.map((ticket, index) => (
                        <tr key={index}>
                            <td>{ticket.ids}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={ticket.status === 'completed'}
                                    onChange={() => handleToggleOption(ticket.id)}
                                    disabled={ticket.status !== 'assigned'}
                                />
                            </td>
                            <td>{ticket.topic}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.severity}</td>
                            <td>{ticket.type}</td>
                            <td>{ticketAssignees[ticket.id] || 'NA'}</td>
                            <td>{ticket.resolvedOn ? formatDate(ticket.resolvedOn) : 'NA'}</td>
                            <td>{ticket.status}</td>
                            <td>{formatDate(ticket.dateCreated)}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination" style={{ float: 'right' }}>
                <button onClick={() => setCurrentTicketPage((prev) => Math.max(prev - 1, 1))}>
                    Previous
                </button>
                <span>{`Page ${currentTicketPage}`}</span>
                <button
                    onClick={() =>
                        setCurrentTicketPage((prev) =>
                            Math.min(prev + 1, Math.ceil(tickets.length / PAGE_SIZE))
                        )
                    }
                >
                    Next
                </button>
            </div>
            <h2 style={{ textAlign: 'center', marginTop: '5rem' }}>List Of Agents</h2>

            <button onClick={handleSort}>
                Sort by Active {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
            <table className="ticket-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Date created</th>

                    </tr>
                </thead>
                <tbody>
                    {displayedAgents.map((agents, index) => (
                        <tr key={index}>
                            <td>{agents.ids}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={agents.active === true}
                                    onChange={() => handleAgentKanbanOption(agents.id)}
                                />
                            </td>
                            <td>{agents.name}</td>
                            <td>{agents.email}</td>
                            <td>{agents.phone}</td>
                            <td>{agents.description}</td>
                            <td>{agents.active ? 'Active' : 'Inactive'}</td>
                            <td>{formatDate(agents.dateCreated)}</td>


                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination" style={{ float: 'right' }}>
                <button onClick={() => setCurrentAgentPage((prev) => Math.max(prev - 1, 1))}>
                    Previous
                </button>
                <span>{`Page ${currentAgentPage}`}</span>
                <button
                    onClick={() =>
                        setCurrentAgentPage((prev) =>
                            Math.min(prev + 1, Math.ceil(agents.length / PAGE_SIZE))
                        )
                    }
                >
                    Next
                </button>
            </div>
        </div>

    );
};

export default Dashboard;

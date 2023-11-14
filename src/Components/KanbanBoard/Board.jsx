// Board.js
import React from 'react';
import Card from '../Cards/Cards';
import './Board.css'

const Board = ({ tickets, groupingOption, sortOption, users }) => {
  let groupedTickets = tickets;

  if (groupingOption === 'status') {
    groupedTickets = tickets.reduce((grouped, ticket) => {
      const key = ticket.status;
      grouped[key] = grouped[key] || [];
      grouped[key].push(ticket);
      return grouped;
    }, {});
  } else if (groupingOption === 'user') {
    groupedTickets = tickets.reduce((grouped, ticket) => {
      const key = ticket.userId;
      grouped[key] = grouped[key] || [];
      grouped[key].push(ticket);
      return grouped;
    }, {});
  } else if (groupingOption === 'priority') {
    groupedTickets = tickets.reduce((grouped, ticket) => {
      const key = getPriorityDisplayName(ticket.priority);
      grouped[key] = grouped[key] || [];
      grouped[key].push(ticket);
      return grouped;
    }, {});
  }

  const userGroups = Object.entries(groupedTickets).map(([key, value]) => ({
    userId: key,
    tickets: value.flat().sort((a, b) => {
      if (sortOption === 'priority') {
        return comparePriorities(a.priority, b.priority);
      } else if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    }),
  }));

  return (
    <div className="board">
      {userGroups.map((group) => (
        <div key={group.userId} className="ticket-group">
          {/* Display user's name instead of ID in the heading */}
          <div className="board-heading">
            <h2>{getUserDisplayName(group.userId, users)}</h2>

            <div className="board-options">
              <button>+</button>
             <button>...</button>
            </div>
          </div>
          {group.tickets.map((ticket) => (
            <Card key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;

// Function to get user's display name
const getUserDisplayName = (userId, users) => {
  const user = users.find((user) => user.id === userId);
  return user ? user.name : userId;
};

// Function to get priority display name
const getPriorityDisplayName = (priority) => {
  switch (priority) {
    case 1:
      return ' Medium  ';
    case 2:
      return 'No Priority';
    case 3:
      return 'High';
    case 4:
      return 'Urgent';
    case 0:
      return 'Low';
    default:
      return `Priority ${priority}`;
  }
};

// Function to compare priorities
const comparePriorities = (priorityA, priorityB) => {
  const priorityOrder = { 1: 1, 2: 2, 3: 3, 4: 4, 0: 5 };
  return priorityOrder[priorityA] - priorityOrder[priorityB];
};

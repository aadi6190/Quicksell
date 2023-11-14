// App.js
import React, { useState, useEffect } from 'react';
import Board from './Components/KanbanBoard/Board';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(localStorage.getItem('groupingOption') || 'status');
  const [sortOption, setSortOption] = useState(localStorage.getItem('sortOption') || 'priority');

  useEffect(() => {
    // Fetch data from API and setTickets and setUsers
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    // Save grouping and sort options to local storage
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('sortOption', sortOption);
  }, [groupingOption, sortOption]);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="app">
      <header>
        <button onClick={() => handleGroupingChange('status')}>Group by Status</button>
        <button onClick={() => handleGroupingChange('user')}>Group by User</button>
        <button onClick={() => handleGroupingChange('priority')}>Group by Priority</button>

        <label>
         Display: 
          <select onChange={(e) => handleSortChange(e.target.value)} value={sortOption} placeholder='Display'>
            <option value="priority">Priority</option>
            <option value="title">Status</option>
          </select>
        </label>
        <div className='lable'> Made By AADESH SINGH</div>
      </header>

      <Board tickets={tickets} groupingOption={groupingOption} sortOption={sortOption} users={users} />
    </div>
  );
};

export default App;
// Card.js
import React from 'react';
import './Card.css'

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <div className="card-head">
        <div className="cam"><p>CAM</p></div>
        <img className="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xoxlNinnY6eHDdT9cRRYF1J3xwxPNHWpaQ&usqp=CAU" alt='avatar' />

      </div>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <div className="card-footer">
        <button>!</button>
       <span> Feature Request</span></div>

      {/* You can add other ticket details as needed */}
    </div>
  );
};

export default Card;

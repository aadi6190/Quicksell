// Column.js
import React from 'react';
import Card from '../Cards/Cards';

const Column = ({ title, cards }) => {
    return (
      <div className="column">
        <h2>{title}</h2>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    );
  };
  
  export default Column;
  
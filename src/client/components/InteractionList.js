import React from 'react';
import InteractionCard from './InteractionCard';

const InteractionList = ({ interactions }) => {
  return (
    <div className="interaction-list">
      {interactions.map(interaction => (
        <InteractionCard 
          key={interaction._id} 
          interaction={interaction} 
        />
      ))}
    </div>
  );
};

export default InteractionList; 
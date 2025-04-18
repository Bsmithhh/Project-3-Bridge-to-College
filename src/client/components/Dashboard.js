import React, { useState, useEffect } from 'react';
import InteractionList from './InteractionList';
import FilterPanel from './FilterPanel';
import Stats from './Stats';

const Dashboard = () => {
  const [interactions, setInteractions] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    flagType: 'all',
    dateRange: 'week'
  });

  useEffect(() => {
    fetchInteractions();
  }, [filters]);

  const fetchInteractions = async () => {
    try {
      const response = await fetch('/api/interactions/flagged');
      const data = await response.json();
      setInteractions(data);
    } catch (err) {
      console.error('Error fetching interactions:', err);
    }
  };

  return (
    <div className="dashboard">
      <h1>TruthBot Dashboard</h1>
      <Stats interactions={interactions} />
      <div className="dashboard-content">
        <FilterPanel filters={filters} setFilters={setFilters} />
        <InteractionList interactions={interactions} />
      </div>
    </div>
  );
};

export default Dashboard; 
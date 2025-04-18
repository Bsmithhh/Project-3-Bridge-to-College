import React, { useState } from 'react';

const InteractionCard = ({ interaction }) => {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(interaction.reviewNotes || '');

  const handleStatusChange = async (newStatus) => {
    try {
      await fetch(`/api/interactions/${interaction._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: newStatus,
          reviewNotes: notes 
        }),
      });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getFlagColor = (flag) => {
    const colors = {
      calculus_override: '#e3f2fd',
      major_mismatch: '#fff3e0',
      financial_concern: '#ffebee',
      demographic_mismatch: '#f3e5f5',
      location_concern: '#e8f5e9',
      deeper_needs: '#fce4ec'
    };
    return colors[flag] || '#f5f5f5';
  };

  return (
    <div className="interaction-card">
      <div className="card-header">
        <span className="student-id">Student ID: {interaction.studentId}</span>
        <span className="college">{interaction.collegeName}</span>
        <span className="timestamp">
          {new Date(interaction.timestamp).toLocaleString()}
        </span>
      </div>
      
      <div className="flags">
        {interaction.flags.map(flag => (
          <span 
            key={flag} 
            className="flag-badge"
            style={{ backgroundColor: getFlagColor(flag) }}
          >
            {flag.replace(/_/g, ' ')}
          </span>
        ))}
      </div>

      {expanded && (
        <div className="details">
          <div className="academic-profile">
            <h4>Academic Profile</h4>
            <p>GPA: {interaction.academicProfile.gpa}</p>
            <p>SAT Math: {interaction.academicProfile.satMath}</p>
            <p>SAT English: {interaction.academicProfile.satEnglish}</p>
          </div>
          
          <div className="fit-scores">
            <h4>Fit Scores</h4>
            <p>Academic: {interaction.fitScores.academic}/5</p>
            <p>Social: {interaction.fitScores.social}/5</p>
            <p>Financial: {interaction.fitScores.financial}/5</p>
          </div>

          <div className="notes">
            <h4>Review Notes</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add review notes..."
            />
          </div>
        </div>
      )}

      <div className="card-footer">
        <button 
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
        
        <div className="status-controls">
          <select 
            value={interaction.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InteractionCard; 
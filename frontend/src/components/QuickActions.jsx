// src/components/QuickActions.jsx
import React from 'react';
import './QuickActions.css';

const QuickActions = ({ actions, onAction }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="quick-actions">
      <div className="quick-actions-header">
        <span>🚀 Quick Actions</span>
      </div>
      <div className="quick-actions-list">
        {actions.map((action, index) => (
          <button
            key={index}
            className="quick-action-btn"
            onClick={() => onAction(action)}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

// src/components/Message.jsx
import React from 'react';
import './Message.css';

const Message = ({ message, onNavigationSuggestion }) => {
  const { author, text, type, suggestedRoute } = message;
  const isBot = author === 'bot';

  return (
    <div className={`message-row ${isBot ? 'bot-row' : 'user-row'}`}>
      <div className={`message-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        <div className="message-content">
          {text}
        </div>
        
        {/* Show navigation button if there's a suggested route */}
        {isBot && suggestedRoute && onNavigationSuggestion && (
          <div className="navigation-suggestion">
            <button 
              className="nav-suggestion-btn"
              onClick={() => onNavigationSuggestion(suggestedRoute)}
            >
              🧭 Take me there
            </button>
          </div>
        )}
        
        {/* Show message type indicator */}
        {isBot && type === 'navigation' && (
          <div className="message-type-indicator navigation-indicator">
            ✅ Navigation
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;

// src/components/ChatInput.jsx
import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        disabled={isLoading}
      />
      <button type="submit" className="send-button" disabled={isLoading}>
        {isLoading ? '...' : 'Send'}
      </button>
    </form>
  );
};

export default ChatInput;

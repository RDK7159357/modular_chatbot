// src/components/Message.jsx
import React from 'react';
import './Message.css';

const Message = ({ message }) => {
  const { author, text } = message;
  const isBot = author === 'bot';

  return (
    <div className={`message-row ${isBot ? 'bot-row' : 'user-row'}`}>
      <div className={`message-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        {text}
      </div>
    </div>
  );
};

export default Message;

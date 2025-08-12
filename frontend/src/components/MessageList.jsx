// src/components/MessageList.jsx
import React, { useEffect, useRef } from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages }) => {
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;

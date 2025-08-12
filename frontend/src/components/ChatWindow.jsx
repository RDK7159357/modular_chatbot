// src/components/ChatWindow.jsx
import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './ChatWindow.css';

const ChatWindow = ({ messages, onSendMessage, isLoading, onClose }) => {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Chat with our AI</h3>
        <button onClick={onClose} className="close-button">X</button>
      </div>
      <MessageList messages={messages} />
      {isLoading && <div className="typing-indicator">Bot is typing...</div>}
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;

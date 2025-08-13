// src/components/ChatWindow.jsx
import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import './ChatWindow.css';

const ChatWindow = ({ 
  messages, 
  onSendMessage, 
  isLoading, 
  onClose, 
  quickActions = [], 
  onQuickAction,
  onNavigationSuggestion 
}) => {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>🤖 Virtual Assistant</h3>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      
      {quickActions.length > 0 && (
        <QuickActions 
          actions={quickActions} 
          onAction={onQuickAction} 
        />
      )}
      
      <MessageList 
        messages={messages} 
        onNavigationSuggestion={onNavigationSuggestion}
      />
      
      {isLoading && (
        <div className="typing-indicator">
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>Assistant is thinking...</span>
        </div>
      )}
      
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;

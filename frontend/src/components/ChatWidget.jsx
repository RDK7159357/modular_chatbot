// src/components/ChatWidget.jsx
import React, { useState } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow';
import ChatIcon from './ChatIcon';
import './ChatWidget.css';

// The ID for the website we want to talk to
const WEBSITE_ID = "iare_website";  // Changed to match the ingested data
// The URL of our backend API
const API_URL = "http://127.0.0.1:8000/api/chat";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { author: 'bot', text: 'Hello! Ask me anything about IARE website.' }
  ]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSendMessage = async (userMessage) => {
    // Add user message to the UI
    setMessages(prev => [...prev, { author: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Send message to the backend
      const response = await axios.post(API_URL, {
        question: userMessage,
        website_id: WEBSITE_ID
      });

      // Add bot response to the UI
      setMessages(prev => [...prev, { author: 'bot', text: response.data.answer }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages(prev => [...prev, { author: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <>
          <div className="chat-widget-overlay" onClick={() => setIsOpen(false)} />
          <ChatWindow 
            messages={messages} 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onClose={() => setIsOpen(false)}
          />
        </>
      )}
      <ChatIcon onClick={toggleOpen} />
    </div>
  );
};

export default ChatWidget;

// src/components/ChatWidget.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import ChatIcon from './ChatIcon';
import VirtualAssistant from '../services/VirtualAssistant';
import './ChatWidget.css';

// The ID for the website we want to talk to
const WEBSITE_ID = "iare_website";
// The URL of our backend API
const API_URL = "http://127.0.0.1:8000/api/chat";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { author: 'bot', text: 'Hello! I\'m your virtual assistant. Ask me anything about IARE or say things like "show me admissions" to navigate.' }
  ]);
  const [quickActions, setQuickActions] = useState([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const virtualAssistant = new VirtualAssistant(API_URL, WEBSITE_ID);

  useEffect(() => {
    // Update quick actions based on current route
    const actions = virtualAssistant.getQuickActions(location.pathname);
    setQuickActions(actions);
  }, [location.pathname]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSendMessage = async (userMessage) => {
    // Add user message to the UI
    setMessages(prev => [...prev, { author: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Process the user input through virtual assistant
      const result = await virtualAssistant.processUserInput(userMessage, navigate);
      
      let botMessage = result.message;
      
      // Add navigation suggestion if applicable
      if (result.hasSuggestion && result.suggestedRoute) {
        botMessage += `\n\n💡 Would you like me to take you to the relevant section?`;
      }
      
      // Add bot response to the UI
      setMessages(prev => [...prev, { 
        author: 'bot', 
        text: botMessage,
        type: result.type,
        suggestedRoute: result.suggestedRoute 
      }]);

      // If it's a navigation command, add a confirmation message
      if (result.isNavigation) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            author: 'bot', 
            text: `✅ Successfully navigated! You can ask me questions about this section or navigate to other areas.` 
          }]);
        }, 1000);
      }

    } catch (error) {
      console.error("Error processing message:", error);
      setMessages(prev => [...prev, { author: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.command);
  };

  const handleNavigationSuggestion = (route) => {
    navigate(route);
    setMessages(prev => [...prev, { 
      author: 'bot', 
      text: `Navigated to the requested section! How can I help you with this information?` 
    }]);
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
            quickActions={quickActions}
            onQuickAction={handleQuickAction}
            onNavigationSuggestion={handleNavigationSuggestion}
          />
        </>
      )}
      <ChatIcon onClick={toggleOpen} />
    </div>
  );
};

export default ChatWidget;

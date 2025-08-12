// src/App.jsx
import React from 'react';
import ChatWidget from './components/ChatWidget';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* This is where our chatbot will live */}
      <ChatWidget />
    </div>
  );
}

export default App;

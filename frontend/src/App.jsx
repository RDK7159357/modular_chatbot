// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Admissions from './pages/Admissions';
import Academics from './pages/Academics';
import Faculty from './pages/Faculty';
import Services from './pages/Services';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        
        {/* Virtual Assistant ChatWidget - available on all pages */}
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;

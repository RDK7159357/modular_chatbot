// src/components/Navigation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/admissions', label: 'Admissions', icon: '🎓' },
    { path: '/academics', label: 'Academics', icon: '📚' },
    { path: '/faculty', label: 'Faculty', icon: '👨‍🏫' },
    { path: '/services', label: 'Services', icon: '🛠️' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>IARE Assistant</h2>
      </div>
      
      <ul className="nav-menu">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

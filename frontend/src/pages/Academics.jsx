// src/pages/Academics.jsx
import React from 'react';

const Academics = () => {
  return (
    <div className="page-container">
      <h1>Academic Programs</h1>
      <div className="content-section">
        <h2>Departments & Programs</h2>
        
        <div className="departments-grid">
          <div className="department-card">
            <h3>Computer Science & Engineering</h3>
            <p>B.Tech, M.Tech programs in CSE</p>
          </div>
          
          <div className="department-card">
            <h3>Aeronautical Engineering</h3>
            <p>Specialized programs in Aerospace</p>
          </div>
          
          <div className="department-card">
            <h3>Electronics & Communication</h3>
            <p>ECE programs and specializations</p>
          </div>
          
          <div className="department-card">
            <h3>Mechanical Engineering</h3>
            <p>Traditional and modern mechanical programs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;

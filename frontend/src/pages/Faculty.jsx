// src/pages/Faculty.jsx
import React from 'react';

const Faculty = () => {
  return (
    <div className="page-container">
      <h1>Faculty Directory</h1>
      <div className="content-section">
        <h2>Our Distinguished Faculty</h2>
        
        <div className="faculty-grid">
          <div className="faculty-card">
            <h3>Dr. John Smith</h3>
            <p>Professor, Computer Science</p>
            <p>Specialization: AI & Machine Learning</p>
          </div>
          
          <div className="faculty-card">
            <h3>Dr. Sarah Johnson</h3>
            <p>Associate Professor, Aeronautical Engineering</p>
            <p>Specialization: Aerospace Dynamics</p>
          </div>
          
          <div className="faculty-card">
            <h3>Dr. Michael Chen</h3>
            <p>Professor, Electronics & Communication</p>
            <p>Specialization: Signal Processing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty;

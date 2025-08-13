// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="page-container">
      <h1>Welcome to IARE Virtual Assistant</h1>
      <div className="content-section">
        <h2>About IARE</h2>
        <p>Institute of Aeronautical Engineering (IARE) is a leading engineering institution...</p>
        
        <div className="quick-links">
          <h3>Quick Access</h3>
          <ul>
            <li>Admissions Information</li>
            <li>Academic Programs</li>
            <li>Faculty Directory</li>
            <li>Student Services</li>
            <li>Campus Facilities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

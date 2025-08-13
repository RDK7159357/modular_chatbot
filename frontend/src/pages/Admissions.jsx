// src/pages/Admissions.jsx
import React from 'react';

const Admissions = () => {
  return (
    <div className="page-container">
      <h1>Admissions</h1>
      <div className="content-section">
        <h2>Admission Process</h2>
        <p>Learn about the admission requirements and process for IARE.</p>
        
        <div className="info-cards">
          <div className="info-card">
            <h3>Eligibility Criteria</h3>
            <p>Requirements for different programs...</p>
          </div>
          
          <div className="info-card">
            <h3>Application Process</h3>
            <p>Step-by-step guide to apply...</p>
          </div>
          
          <div className="info-card">
            <h3>Important Dates</h3>
            <p>Admission deadlines and schedules...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admissions;

// src/pages/Services.jsx
import React from 'react';

const Services = () => {
  return (
    <div className="page-container">
      <h1>Student Services</h1>
      <div className="content-section">
        <h2>Support Services for Students</h2>
        
        <div className="services-grid">
          <div className="service-card">
            <h3>Library Services</h3>
            <p>Access to digital and physical resources</p>
          </div>
          
          <div className="service-card">
            <h3>Career Counseling</h3>
            <p>Guidance for career planning and placements</p>
          </div>
          
          <div className="service-card">
            <h3>Health Services</h3>
            <p>Medical facilities and wellness programs</p>
          </div>
          
          <div className="service-card">
            <h3>Hostel Facilities</h3>
            <p>Accommodation and dining services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

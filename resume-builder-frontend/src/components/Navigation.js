import React from 'react';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="logo">📄</span>
          <span className="brand-name">Resume Builder</span>
        </div>
        <div className="navbar-info">
          <p className="tagline">Create Professional Resumes in Minutes</p>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

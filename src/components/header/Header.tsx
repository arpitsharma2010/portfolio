import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

const Header: React.FC = (props) => {
  return (
    <aside className="sidebar">
      
      {/* Profile Section */}
      <div className="profile-section">
        <img 
          src={`${props.url}/profile.png`}
          alt="Arpit Sharma" 
          className="profile-img"
        />
        <h2 className="profile-name">Arpit Sharma</h2>
        <p className="profile-bio">
          Software Engineer || Full-Stack Developer || AI & Cloud Enthusiast
        </p>
      </div>

      {/* Navigation Links - Properly Aligned */}
      <nav className="nav-section">
        <ul className="nav-links">
          <li><Link to="/portfolio">Home</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/education">Education</Link></li>
          <li><Link to="/experience">Experience</Link></li>
          <li><Link to="/certifications">Certifications</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Footer - Fixed at Bottom */}
      <div className="footer">
        © {new Date().getFullYear()} Arpit Sharma. All rights reserved.
      </div>

    </aside>
  );
};

export default Header;
import React from "react";
import "../../styles/Header.css";

const Header: React.FC = () => {
  return (
    <aside className="sidebar">
      
      {/* Profile Section */}
      <div className="profile-section">
        <img 
          src="https://lh3.googleusercontent.com/a/ACg8ocKlA3mIUA4Ws1YLoYDiVYfnZjTG9jQ_IjcqO5UQk6u-0Oq6MwEFBA=s576-c-no" 
          alt="Arpit Sharma" 
          className="profile-img"
        />
        <h2 className="profile-name">Arpit Sharma</h2>
        <p className="profile-bio">
          Passionate about Web Development, AI, and Problem-Solving. Always eager to learn, grow, and create impactful solutions.
        </p>
      </div>

      {/* Navigation Links - Properly Aligned */}
      <nav className="nav-section">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#contact">Contact</a></li>
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
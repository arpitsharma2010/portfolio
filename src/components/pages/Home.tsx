import React from "react";
import { Typewriter } from "react-simple-typewriter";
import "../../styles/Home.css";

const Home: React.FC = (props) => {
  const resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

  return (
    <section className="page-content">
      {/* Animated Greeting */}
      <h1 className="greeting">
        Hi,
        <br />
        <span className="highlight">
          <Typewriter
            words={["I'm Arpit Sharma"]}
            typeSpeed={100}
            cursor
            cursorStyle="|"
          />
        </span>
      </h1>

      {/* Current Work Description */}
      <p className="subtitle">
        Pursuing Master of Science in Computer Science and Engineering <br />
        @{" "}
        <a
          href="https://engineering.buffalo.edu/computer-science-engineering.html"
          target="_blank"
          rel="noopener noreferrer"
          className="university-link"
        >
          State University of New York at Buffalo (UB)
        </a>
        <br />
        Specialization in Software and Hardware Systems
      </p>

      {/* Developer Image */}
      <div className="image-container">
        <img src={`${props.url}/developer_image.jpg`} alt="Developer" className="profile-image" />
      </div>

      {/* Professional Summary */}
      <p className="description">
        I am a Software Engineer passionate about building scalable applications, optimizing cloud infrastructure, and automating DevOps pipelines. With more than 3.5 years of experience in Software development using Java, Python, ReactJS, Spring Boot, .NET Core, and cloud platforms like AWS, I thrive on designing efficient, high-performance systems. While my core expertise lies in software development and cloud computing, I am also exploring Machine Learning & AI applications as part of my Master’s at SUNY Buffalo.
      </p>

      {/* View Resume Button */}
      <div className="cta-buttons">
        <a href={resumePDF} className="resume-btn" target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      </div>
    </section>
  );
};

export default Home;
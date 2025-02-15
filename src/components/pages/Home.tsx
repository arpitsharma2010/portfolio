import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import "../../styles/Home.css";

const Home: React.FC = () => {
    //let imgUrl = "./../../images/developer_image.jpg";
    const [isResumeAvailable, setIsResumeAvailable] = useState(false);

  // Check if the resume file exists
  useEffect(() => {
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setIsResumeAvailable(true);
        }
      })
      .catch(() => setIsResumeAvailable(false));
  }, []);
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
          State University of New York at Buffalo(UB)
        </a>
        <br/>
        Specialization in Software and Hardware Systems
      </p>

      <div className="image-container">
        <img src="./../../../developer_image.jpg" alt="Developer Image" className="profile-image" />
      </div>

      {/* Professional Summary */}
      <p className="description">
      I am a Software Engineer passionate about building scalable applications, optimizing cloud infrastructure, and automating DevOps pipelines. With experience in Java, Python, ReactJS, Spring Boot, .NET Core, and cloud platforms like AWS, I thrive on designing efficient, high-performance systems. While my core expertise lies in software development and cloud computing, I am also exploring Machine Learning & AI applications as part of my Master’s at SUNY Buffalo.
      </p>

      {/* Call to Action */}
      <div className="cta-buttons">
        {isResumeAvailable ? (
          <a href="/resume.pdf" download="Arpit_Sharma_Resume.pdf" className="btn btn-primary">
            📄 Download Resume
          </a>
        ) : (
          <button className="btn btn-disabled" disabled>
            ❌ Resume Not Available
          </button>
        )}
      </div>
    </section>
  );
};

export default Home;
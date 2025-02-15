import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
//import "../../styles/Home.css";

const Home: React.FC = () => {
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
        Welcome
        <br />
        To
        <br />
        <span className="highlight">
          <Typewriter
            words={["Arpit Sharma's"]}
            typeSpeed={100}
            cursor
            cursorStyle="|"
          />
        </span>
        <br />
        Portfolio
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
          State University of New York at Buffalo
        </a>
      </p>

      {/* Professional Summary */}
      <p className="description">
        A <b>highly motivated software engineer</b> with expertise in <b>AI, machine learning, and full-stack development</b>.<br/>
        Experienced in <b>building scalable APIs, cloud computing, and optimizing CI/CD pipelines</b>.<br/>
        Passionate about developing innovative solutions that enhance efficiency and user experience.
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
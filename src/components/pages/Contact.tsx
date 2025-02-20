import React from "react";
import "./../../styles/Contact.css";

const Contact: React.FC = () => {

  let resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

  return (
    <section className="page-content">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center">Get in Touch</h2>

      {/* Contact Information */}
      <div className="contact-info">
        <p><strong>Location:</strong> Buffalo, New York, USA</p>
        <p><strong>Email:</strong> <a href="mailto:arpeet.sharma.1998@gmail.com" className="contact-link">arpeet.sharma.1998@gmail.com</a></p>
        <p><strong>University Email:</strong> <a href="mailto:arpitdil@buffalo.edu" className="contact-link">arpitdil@buffalo.edu</a></p>
        <p><strong>Phone:</strong> +1 (716) 750-7459</p>
      </div>

      <h3 className="text-2xl font-semibold text-center mt-6">Connect with Me</h3>
      <div className="social-links">
        <a href="https://www.linkedin.com/in/arpitsharma2010/" target="_blank" rel="noopener noreferrer">
          <img src="https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_200_200/company-logo_200_200/0/1638831590218/linkedin_logo?e=1747872000&v=beta&t=z-85R5yPMGYXef2cY7hM6fBVFVCoIeXFHZTYxqGlmP0" alt="LinkedIn" className="social-icon" />
        </a>
        <a href="https://github.com/arpitsharma2010" target="_blank" rel="noopener noreferrer">
          <img src="https://media.licdn.com/dms/image/v2/C560BAQFmuLSyL1nlPA/company-logo_200_200/company-logo_200_200/0/1678231359043/github_logo?e=1747872000&v=beta&t=B4MRR9ynYVMRwwl5xOGmjRmAkrUsDpq8A9LYxpHL6y0" alt="GitHub" className="social-icon" />
        </a>
      </div>

      <div className="contact-buttons">
      <a href={resumePDF} download="Arpit_Sharma_Resume.pdf" className="resume-btn" target='_blank' rel='noopener noreferrer'>View Resume</a>
      </div>

      <div className="map-container">
        <iframe 
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23819.416099526294!2d-78.8783683!3d42.8864468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d312260e0347c1%3A0x4b308af32d6e01c8!2sBuffalo%2C%20NY!5e0!3m2!1sen!2sus!4v1708289181023!5m2!1sen!2sus"
          width="100%"
          height="300"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
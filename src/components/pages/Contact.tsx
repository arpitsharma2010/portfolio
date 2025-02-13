import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="page-content">
      {/* Section Title */}
      <h2 className="text-4xl font-bold">📩 Get in Touch</h2>

      {/* Contact Information */}
      <div className="text-lg text-gray-700 mt-6">
        <p>📍 <strong>Location:</strong> New Delhi, India</p>
        <p>📧 <strong>Email:</strong> <a href="mailto:your.email@example.com" className="text-blue-500 hover:underline">your.email@example.com</a></p>
        <p>📞 <strong>Phone:</strong> +91 98765 43210</p>
      </div>

      {/* Social Media Links */}
      <h3 className="text-2xl font-semibold mt-8">Connect with Me</h3>
      <div className="flex gap-6 mt-4">
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
          <img src="/contact/linkedin.png" alt="LinkedIn" className="w-12 h-12 hover:opacity-80 transition" />
        </a>
        <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
          <img src="/contact/github.png" alt="GitHub" className="w-12 h-12 hover:opacity-80 transition" />
        </a>
        <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer">
          <img src="/contact/twitter.png" alt="Twitter" className="w-12 h-12 hover:opacity-80 transition" />
        </a>
      </div>

      {/* CTA Message */}
      <div className="mt-8 max-w-2xl text-lg text-gray-600">
        <p>Feel free to reach out to me via email or connect with me on LinkedIn! I’m always open to discussing new opportunities, collaborations, or just a friendly chat. 🚀</p>
      </div>

      {/* Extra content for scrolling test */}
      <div className="mt-10">
        {[...Array(20)].map((_, index) => (
          <p key={index} className="text-gray-600 mt-2">More about how to contact me - line {index + 1}</p>
        ))}
      </div>
    </section>
  );
};

export default Contact;
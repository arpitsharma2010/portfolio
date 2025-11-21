import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import SocialLinks from "../utils/SocialLinks.tsx";

const Contact: React.FC = () => {
  const resumePDF =
    "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

  return (
    <section className="w-full px-4 py-16 sm:px-6 min-h-screen bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-600 dark:text-cyan-400">
        Get in Touch
      </h2>

      {/* Contact Info Grid */}
      <div className="grid sm:grid-cols-2 gap-6 text-center max-w-4xl mx-auto mb-12">
        <div className="flex flex-col items-center">
          <FaMapMarkerAlt className="text-cyan-500 text-2xl mb-2" />
          <p className="font-semibold">Buffalo, New York, USA</p>
        </div>
        <div className="flex flex-col items-center">
          <FaEnvelope className="text-cyan-500 text-2xl mb-2" />
          <a
            href="mailto:arpitdil@buffalo.edu"
            className="text-blue-600 dark:text-blue-300 hover:underline text-sm"
          >
            arpitdil@buffalo.edu
          </a>
        </div>
        <div className="flex flex-col items-center">
          <FaPhone className="text-cyan-500 text-2xl mb-2" />
          <p className="font-semibold">+1 (716) 750-7459</p>
        </div>
      </div>

      {/* Social Links */}
      <h3 className="text-2xl font-semibold text-center text-cyan-500 dark:text-cyan-300 mb-6">
        Connect with Me
      </h3>
      <div className="flex justify-center gap-8 mb-12">
        <SocialLinks size="text-3xl" gap="gap-8" />
      </div>

      {/* Resume CTA */}
      <div className="flex justify-center mb-12">
        <a
          href={resumePDF}
          download="Arpit_Sharma_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow hover:bg-cyan-700 transition"
        >
          View Resume
        </a>
      </div>

      {/* Google Map */}
      <div className="w-full max-w-4xl mx-auto">
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23819.416099526294!2d-78.8783683!3d42.8864468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d312260e0347c1%3A0x4b308af32d6e01c8!2sBuffalo%2C%20NY!5e0!3m2!1sen!2sus!4v1708289181023!5m2!1sen!2sus"
          width="100%"
          height="300"
          loading="lazy"
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;

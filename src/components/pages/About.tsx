import React from "react";

const About: React.FC = () => {
  return (
    <section className="page-content">
      {/* Profile Picture */}
      <img 
        src="/profile.jpg" // Make sure your image is in `public/`
        alt="Arpit Sharma"
        className="w-40 h-40 rounded-full border-4 border-gray-500 shadow-md mx-auto"
      />

      {/* Name & Title */}
      <h2 className="text-4xl font-bold mt-4">Arpit Sharma</h2>
      <p className="text-lg mt-4 text-gray-600">Full-Stack Developer | AI Enthusiast</p>

      {/* About Description */}
      <div className="mt-6 text-lg leading-relaxed">
        <p>
          I’m a passionate developer with a deep interest in <strong>AI, Web Development, and Problem-Solving</strong>.
          My journey began when I wrote my first line of code, and since then, I’ve been building 
          <strong> scalable and efficient applications</strong> to solve real-world problems.
        </p>
        <p className="mt-4">
          Over the years, I have gained experience in <strong>React, TypeScript, Node.js, and AI/ML</strong>.  
          I love crafting elegant and user-friendly digital experiences, focusing on both performance and aesthetics.
        </p>
      </div>

      {/* Interests & Philosophy */}
      <div className="mt-6 text-lg leading-relaxed">
        <h3 className="text-2xl font-semibold">What Drives Me?</h3>
        <ul className="mt-4 space-y-2">
          <li>🚀 Always exploring <strong>new technologies</strong> to stay ahead in the industry.</li>
          <li>💡 Passionate about <strong>Artificial Intelligence & Automation</strong>.</li>
          <li>🎨 Striving to <strong>blend creativity with technical excellence</strong>.</li>
          <li>🤝 Love collaborating and <strong>sharing knowledge with the community</strong>.</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="mt-8">
        <a
          href="/contact"
          className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          📩 Let's Connect
        </a>
      </div>

      {/* Extra content for scrolling test */}
      <div className="mt-10">
        {[...Array(20)].map((_, index) => (
          <p key={index} className="text-gray-600 mt-2">More about me - line {index + 1}</p>
        ))}
      </div>
    </section>
  );
};

export default About;
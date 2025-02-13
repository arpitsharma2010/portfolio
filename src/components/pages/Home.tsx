import React from "react";

const Home: React.FC = () => {
  return (
    <section className="page-content">
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="text-lg mt-4">
        Hi, I'm Arpit Sharma, a Full-Stack Developer and AI Enthusiast.
      </p>
      <p className="text-lg mt-4">
        Explore my skills, experience, and projects by using the navigation links.
      </p>
      
      {/* Extra content for scrolling test */}
      <div className="mt-10">
        {[...Array(20)].map((_, index) => (
          <p key={index} className="text-gray-600 mt-2">Scrollable content line {index + 1}</p>
        ))}
      </div>
    </section>
  );
};

export default Home;
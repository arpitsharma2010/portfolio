import React from "react";

const Education: React.FC = () => {
    const educationData = [
        {
          institution: "XYZ University",
          logo: "/education/university.png",
          degree: "Bachelor of Science in Computer Science",
          year: "2018 - 2022",
          description: "Specialized in AI and Full-Stack Development. Worked on research projects and built multiple web applications.",
        },
        {
          institution: "ABC High School",
          logo: "/education/highschool.png",
          degree: "Higher Secondary Education (Science)",
          year: "2016 - 2018",
          description: "Studied Mathematics and Computer Science, participated in national-level coding competitions.",
        },
      ];
  return (
    <section className="page-content">
      {/* Section Title */}
      <h2 className="text-4xl font-bold">🎓 Education & Certifications</h2>

      {/* Education List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {educationData.map((edu, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            {/* Institution Logo */}
            <img src={edu.logo} alt={edu.institution} className="w-20 h-20 mb-4 rounded-full shadow-lg" />

            {/* Institution Name & Degree */}
            <h3 className="text-2xl font-semibold">{edu.institution}</h3>
            <p className="text-lg font-medium text-gray-700">{edu.degree}</p>
            <p className="text-sm text-gray-500">{edu.year}</p>

            {/* Description */}
            <p className="mt-4 text-gray-600">{edu.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Button for Certifications */}
      <div className="mt-8">
        <a
          href="/certifications"
          className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          📜 View Certifications
        </a>
      </div>

      {/* Extra content for scrolling test */}
      <div className="mt-10">
        {[...Array(20)].map((_, index) => (
          <p key={index} className="text-gray-600 mt-2">More about my education - line {index + 1}</p>
        ))}
      </div>
    </section>
  );
};

export default Education;
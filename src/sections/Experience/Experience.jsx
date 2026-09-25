import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./Experience.css";

import {
  experienceScrollAnimation,
} from "../../animations/experienceAnimation";

const API_URL =
  "http://localhost:5000/api";

/*
  Existing hard-coded experience.

  THIS WILL ALWAYS REMAIN
  ON THE PORTFOLIO.
*/
const hardCodedExperience = [
  {
    id: "hard-coded-eduskills",

    company: "EduSkills",

    role:
      "MERN Full Stack Development",

    duration:
      "Jan 2026 — Mar 2026",

    location:
      "Remote, UAE",

    type:
      "Professional Experience",

    responsibilities: [
      "Built responsive UIs using React.js, HTML5, CSS3, and Tailwind CSS.",

      "Developed RESTful APIs with Node.js, Express.js and integrated MongoDB for CRUD operations.",

      "Used Git/GitHub for version control and full-stack development.",
    ],
  },
];

function Experience() {
  const experienceRef =
    useRef(null);

  const [
    dynamicExperiences,
    setDynamicExperiences,
  ] = useState([]);

  useEffect(() => {
    const cleanup =
      experienceScrollAnimation(
        experienceRef.current
      );

    return cleanup;
  }, []);

  useEffect(() => {
    const loadExperiences =
      async () => {
        try {
          const response =
            await fetch(
              `${API_URL}/experience`
            );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch experiences."
            );
          }

          const data =
            await response.json();

          console.log(
            "Portfolio experience API response:",
            data
          );

          setDynamicExperiences(
            Array.isArray(
              data.experiences
            )
              ? data.experiences
              : []
          );
        } catch (error) {
          console.error(
            "Experience loading error:",
            error
          );

          /*
            If API fails,
            hard-coded experience
            will still show.
          */
          setDynamicExperiences([]);
        }
      };

    loadExperiences();
  }, []);

  /*
    Hard-coded experience first.
    Admin-added experiences after it.
  */
  const allExperiences = [
    ...dynamicExperiences,
    ...hardCodedExperience,
    
  ];

  return (
    <section
      id="experience"
      className="experience-section"
      ref={experienceRef}
    >
      <div className="experience-container">

       
        <div className="experience-heading">
          <p>EXPERIENCE</p>

          <h2>
            My professional journey.
          </h2>
        </div>

       
        <div className="experience-timeline">

          <div className="experience-line"></div>

          {allExperiences.map(
            (experience) => (
              <article
                className="experience-card"
                key={
                  experience._id ||
                  experience.id
                }
              >
                <div className="experience-dot"></div>

                <div className="experience-content">

                  <div className="experience-top">

                    <span className="experience-duration">
                      {experience.duration}
                    </span>

                    <span className="experience-type">
                      {experience.type}
                    </span>

                  </div>

                  <h3>
                    {experience.role}
                  </h3>

                  <h4>
                    {experience.company}
                  </h4>

                  <p className="experience-location">
                    {experience.location}
                  </p>

                  <ul className="experience-responsibilities">
                    {experience.responsibilities.map(
                      (
                        responsibility,
                        index
                      ) => (
                        <li
                          key={index}
                        >
                          {responsibility}
                        </li>
                      )
                    )}
                  </ul>

                </div>
              </article>
            )
          )}

        </div>
      </div>
    </section>
  );
}

export default Experience;
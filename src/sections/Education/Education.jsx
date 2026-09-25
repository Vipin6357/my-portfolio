import { useEffect, useRef, useState } from "react";

import "./Education.css";

import {
  educationScrollAnimation,
} from "../../animations/educationAnimation";

const API_URL =
  "http://localhost:5000/api";

/*
  Existing education.

  THESE WILL ALWAYS REMAIN
  ON THE PORTFOLIO.
*/
const hardCodedEducation = [
  {
    duration: "2023 — 2027",

    status:
      "Currently Pursuing",

    degree:
      "Bachelor of Technology (B.Tech)",

    field:
      "Computer Science and Engineering",

    institute:
      "Invertis University, Bareilly, Uttar Pradesh",

    description:
      "Pursuing a Bachelor of Technology in Computer Science and Engineering with a focus on software development, full-stack web development and problem solving.",
  },

  {
    duration: "2022",

    status: "CBSE",

    degree:
      "Senior Secondary (12th)",

    field:
      "Physics, Chemistry & Mathematics (PCM)",

    institute:
      "Lions Bal Vidhya Mandir, Pilibhit, Uttar Pradesh",

    description:
      "Completed Class XII with Physics, Chemistry and Mathematics as the core subjects under the CBSE curriculum.",
  },

  {
    duration: "2020",

    status: "CBSE",

    degree:
      "Secondary School (10th)",

    field: "Class X",

    institute:
      "Lions Bal Vidhya Mandir, Pilibhit, Uttar Pradesh",

    description:
      "Completed Class X under the CBSE curriculum in 2020.",
  },
];

function Education() {
  const educationRef =
    useRef(null);

  const [
    dynamicEducation,
    setDynamicEducation,
  ] = useState([]);

  useEffect(() => {
    const cleanup =
      educationScrollAnimation(
        educationRef.current
      );

    return cleanup;
  }, []);

  useEffect(() => {
    const loadEducation =
      async () => {
        try {
          const response =
            await fetch(
              `${API_URL}/education`
            );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch education."
            );
          }

          const data =
            await response.json();

          setDynamicEducation(
            Array.isArray(
              data.educations
            )
              ? data.educations
              : []
          );
        } catch (error) {
          console.error(
            "Education loading error:",
            error
          );

       
        
          setDynamicEducation([]);
        }
      };

    loadEducation();
  }, []);

  const allEducation = [
    ...dynamicEducation,
    ...hardCodedEducation,
  ];

  return (
    <section
      id="education"
      className="education-section"
      ref={educationRef}
    >
      <div className="education-container">

        <div className="education-heading">
          <p>EDUCATION</p>

          <h2>
            My academic journey.
          </h2>
        </div>

        <div className="education-timeline">

          <div className="education-line"></div>

          {allEducation.map(
            (education, index) => (
              <article
                className="education-card"
                key={
                  education._id ||
                  `hard-coded-${index}`
                }
              >
                <div className="education-dot"></div>

                <div className="education-content">

                  <div className="education-top">

                    <span className="education-duration">
                      {education.duration}
                    </span>

                    <span className="education-status">
                      {education.status}
                    </span>

                  </div>

                  <h3>
                    {education.degree}
                  </h3>

                  <h4>
                    {education.field}
                  </h4>

                  <p className="education-institute">
                    {education.institute}
                  </p>

                  <p className="education-description">
                    {education.description}
                  </p>

                </div>
              </article>
            )
          )}

        </div>
      </div>
    </section>
  );
}

export default Education;
import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./About.css";

import {
  aboutScrollAnimation,
} from "../../animations/aboutAnimation";

import aboutAvatar from "../../assets/images/about-avatar.png";

const API_URL =
  import.meta.env.VITE_API_URL;

const defaultAbout = {
  heading:
    "Building ideas into digital experiences.",

  role:
    "MERN Stack Developer",

  mainTitle:
    "I build modern, scalable and interactive web applications.",

  description:
    "I'm a Computer Science and Engineering student and a MERN Stack Developer focused on building responsive full-stack web applications. I enjoy turning ideas into clean, functional and engaging digital experiences using modern web technologies.",

  stats: [
    {
      value: "2+",
      label: "Full Stack Projects",
    },
    {
      value: "50+",
      label: "DSA Problems",
    },
    {
      value: "MERN",
      label: "Primary Stack",
    },
  ],
};


function About() {
  const aboutRef =
    useRef(null);

  const [about, setAbout] =
    useState(defaultAbout);


  useEffect(() => {
    const cleanup =
      aboutScrollAnimation(
        aboutRef.current
      );

    return cleanup;
  }, []);


  useEffect(() => {
    const loadAbout = async () => {
      try {
        const response =
          await fetch(
            `${API_URL}/about`
          );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch About section."
          );
        }

        const data =
          await response.json();

        if (data.about) {
          setAbout(data.about);
        }
      } catch (error) {
        console.error(
          "About loading error:",
          error
        );
      }
    };

    loadAbout();
  }, []);


  return (
    <section
      id="about"
      className="about-section"
      ref={aboutRef}
    >
      <div className="about-container">

        {/* FIXED ABOUT ME */}

        <div className="about-heading">
          <p>ABOUT ME</p>

          <h2>
            {about.heading
              .split(" ")
              .slice(0, -2)
              .join(" ")}{" "}
            <span>
              {about.heading
                .split(" ")
                .slice(-2)
                .join(" ")}
            </span>
          </h2>
        </div>


        <div className="about-content">

          {/* FIXED IMAGE */}

          <div className="about-visual">
            <div className="about-image-wrapper">

              <div className="about-glow"></div>

              <img
                src={aboutAvatar}
                alt="Vipin Gangwar"
              />

            </div>
          </div>


          {/* EDITABLE CONTENT */}

          <div className="about-info">

            <p className="about-role">
              {about.role}
            </p>


            <h3>
              {about.mainTitle}
            </h3>


            <p className="about-description">
              {about.description}
            </p>


            <div className="about-stats">

              {about.stats?.map(
                (stat, index) => (
                  <div
                    className="about-stat"
                    key={index}
                  >
                    <strong>
                      {stat.value}
                    </strong>

                    <span>
                      {stat.label}
                    </span>
                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;
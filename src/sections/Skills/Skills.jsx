import "./Skills.css";

import { useEffect, useRef, useState } from "react";
import { skillsScrollAnimation } from "../../animations/skillsAnimation";

import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDocker,
} from "react-icons/fa";

import {
  SiRedux,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
} from "react-icons/si";

const API_URL = import.meta.env.VITE_API_URL;

/*
  Existing hard-coded skills.
  THESE WILL ALWAYS REMAIN ON PORTFOLIO.
*/
const hardCodedSkills = {
  "Programming Languages": [
    {
      name: "Java",
    },
    {
      name: "JavaScript",
      icon: "javascript",
    },
  ],

  Frontend: [
    {
      name: "React.js",
      icon: "react",
    },
    {
      name: "React Hooks",
    },
    {
      name: "Redux Toolkit",
      icon: "redux",
    },
    {
      name: "HTML5",
    },
    {
      name: "CSS3",
    },
    {
      name: "Tailwind CSS",
      icon: "tailwind",
    },
    {
      name: "Bootstrap",
    },
    {
      name: "Material UI",
    },
    {
      name: "Responsive Web Design",
    },
    {
      name: "Axios",
    },
    {
      name: "Fetch API",
    },
  ],

  Backend: [
    {
      name: "Node.js",
      icon: "node",
    },
    {
      name: "Express.js",
      icon: "express",
    },
    {
      name: "RESTful API Development",
    },
    {
      name: "Middleware",
    },
    {
      name: "Socket.IO",
    },
  ],

  "Real-Time & Authentication": [
    {
      name: "WebRTC",
    },
    {
      name: "Google OAuth 2.0",
    },
    {
      name: "JWT Authentication",
    },
    {
      name: "OTP Authentication",
    },
    {
      name: "bcrypt",
    },
    {
      name: "Node.js Crypto",
    },
    {
      name: "Nodemailer",
    },
  ],

  Database: [
    {
      name: "MongoDB",
      icon: "mongodb",
    },
    {
      name: "Mongoose",
    },
    {
      name: "MySQL",
      icon: "mysql",
    },
  ],

  "Developer Tools": [
    {
      name: "Git",
      icon: "git",
    },
    {
      name: "GitHub",
      icon: "github",
    },
    {
      name: "VS Code",
    },
    {
      name: "NPM",
    },
    {
      name: "Docker",
      icon: "docker",
    },
  ],

  "Core Concepts": [
    {
      name: "Data Structures & Algorithms",
    },
    {
      name: "Object-Oriented Programming",
    },
    {
      name: "CRUD Operations",
    },
    {
      name: "REST APIs",
    },
    {
      name: "API Integration",
    },
    {
      name: "MVC Architecture",
    },
    {
      name: "Real-Time Communication",
    },
  ],
};

/*
  Display order on portfolio.
*/
const categories = [
  "Programming Languages",
  "Frontend",
  "Backend",
  "Real-Time & Authentication",
  "Database",
  "Developer Tools",
  "Core Concepts",
];

/*
  Icons for both hard-coded and dynamic skills.
*/
const getSkillIcon = (iconName) => {
  if (!iconName) {
    return null;
  }

  switch (iconName.toLowerCase().trim()) {
    case "javascript":
    case "js":
      return <FaJs />;

    case "react":
    case "reactjs":
    case "react.js":
      return <FaReact />;

    case "node":
    case "nodejs":
    case "node.js":
      return <FaNodeJs />;

    case "express":
    case "expressjs":
    case "express.js":
      return <SiExpress />;

    case "redux":
    case "redux toolkit":
      return <SiRedux />;

    case "tailwind":
    case "tailwindcss":
    case "tailwind css":
      return <SiTailwindcss />;

    case "mongodb":
    case "mongo":
      return <SiMongodb />;

    case "mysql":
      return <SiMysql />;

    case "git":
      return <FaGitAlt />;

    case "github":
      return <FaGithub />;

    case "docker":
      return <FaDocker />;

    default:
      return null;
  }
};

/*
  Backend:
  "Databases"

  Portfolio:
  "Database"

  This function makes both work together.
*/
const normalizeCategory = (category) => {
  if (category === "Databases") {
    return "Database";
  }

  return category;
};

function Skills() {
  const sectionRef = useRef(null);

  const [dynamicSkills, setDynamicSkills] = useState([]);

  useEffect(() => {
    return skillsScrollAnimation(sectionRef.current);
  }, []);

  /*
    Load skills from MongoDB.
  */
  useEffect(() => {
    const loadDynamicSkills = async () => {
      try {
        const response = await fetch(
          `${API_URL}/skills`
        );

        if (!response.ok) {
          throw new Error(
            `Skills API failed: ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "Portfolio skills API response:",
          data
        );

        setDynamicSkills(
          Array.isArray(data.skills)
            ? data.skills
            : []
        );
      } catch (error) {
        console.error(
          "Portfolio skills loading error:",
          error
        );

        /*
          Even if API fails,
          hard-coded skills will still show.
        */
        setDynamicSkills([]);
      }
    };

    loadDynamicSkills();
  }, []);

  /*
    Merge:
    
    Hard-coded skills
          +
    Admin/MongoDB skills
  */
  const getSkillsForCategory = (category) => {
    const hardCoded =
      hardCodedSkills[category] || [];

    const dynamic = dynamicSkills
      .filter((skill) => {
        if (skill.featured === false) {
          return false;
        }

        const normalized =
          normalizeCategory(skill.category);

        return normalized === category;
      })
      .sort((a, b) => {
        return (
          (a.order || 1) -
          (b.order || 1)
        );
      })
      .map((skill) => ({
        name: skill.name,
        icon: skill.icon || "",
        dynamic: true,
        id: skill._id,
      }));

    /*
      IMPORTANT:
      Hard-coded first,
      dynamic skills after them.
    */
    return [
      ...hardCoded,
      ...dynamic,
    ];
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills-section"
    >
      <div className="skills-container">

        <div className="skills-heading">
          <p>MY SKILLS</p>

          <h3>
            Technologies I work with
          </h3>
        </div>

        <div className="skills-categories">

          {categories.map((category) => {
            const skills =
              getSkillsForCategory(category);

            return (
              <div
                className="skill-category"
                key={category}
              >
                <h4>{category}</h4>

                <div className="skill-list">

                  {skills.map(
                    (skill, index) => {
                      const icon =
                        getSkillIcon(
                          skill.icon
                        );

                      return (
                        <div
                          className="skill-card"
                          key={
                            skill.id ||
                            `${category}-${skill.name}-${index}`
                          }
                        >
                          {icon}

                          <span>
                            {skill.name}
                          </span>
                        </div>
                      );
                    }
                  )}

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default Skills;
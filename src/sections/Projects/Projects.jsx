import { useEffect, useState } from "react";
import { getProjects } from "./projectService";
import "./Projects.css";

import { projectsScrollAnimation } from "../../animations/projectsAnimation";

const staticProjects = [
  {
    title: "VConnect",
    description:
      "A real-time communication platform with video calling, instant messaging and real-time collaboration.",
    images: [
      new URL(
        "../../assets/images/projects/vconnect-1.png",
        import.meta.url
      ).href,
      new URL(
        "../../assets/images/projects/vconnect-2.png",
        import.meta.url
      ).href,
      new URL(
        "../../assets/images/projects/vconnect-3.png",
        import.meta.url
      ).href,
      new URL(
        "../../assets/images/projects/vconnect-4.png",
        import.meta.url
      ).href,
      new URL(
        "../../assets/images/projects/vconnect-5.png",
        import.meta.url
      ).href,
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "React Router",
      "Socket.IO",
      "WebRTC",
      "Material UI",
    ],
    liveUrl: "",
    githubUrl: "",
  },

  {
    title: "WanderLust",
    description:
      "A travel listing platform for discovering and managing travel stays and listings.",
    images: [
      new URL(
        "../../assets/images/projects/wanderlust-1.png",
        import.meta.url
      ).href,
      new URL(
        "../../assets/images/projects/wanderlust-2.png",
        import.meta.url
      ).href,
      new URL(
        "../../assets/images/projects/wanderlust-3.png",
        import.meta.url
      ).href,
      new URL(
        "../../assets/images/projects/wanderlust-4.png",
        import.meta.url
      ).href,
    ],
    technologies: [
      "React.js",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Passport.js",
      "Cloudinary",
      "Multer",
      "Joi",
    ],
    liveUrl: "https://wanderlust-ls0c.onrender.com/",
    githubUrl: "https://github.com/Vipin6357/WanderLust-major-project-",
  },
];

function ProjectCard({ project, index }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const projectImages = Array.isArray(project.images)
    ? project.images
        .map((image) =>
          typeof image === "string"
            ? image
            : image?.secure_url || image?.url || ""
        )
        .filter(Boolean)
    : [];

  const totalImages = projectImages.length;

  const nextImage = () => {
    if (totalImages <= 1) return;

    setCurrentImage(
      (prev) => (prev + 1) % totalImages
    );
  };

  const previousImage = () => {
    if (totalImages <= 1) return;

    setCurrentImage(
      (prev) =>
        (prev - 1 + totalImages) % totalImages
    );
  };

  useEffect(() => {
    if (isHovered || totalImages <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % totalImages
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, totalImages]);

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 1024) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -6;

    const rotateY =
      ((x / rect.width) - 0.5) * 6;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <article
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="project-image-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {totalImages > 0 ? (
          <img
            src={projectImages[currentImage]}
            alt={`${project.title} project screenshot ${
              currentImage + 1
            }`}
          />
        ) : (
          <div className="project-no-image">
            No project image available
          </div>
        )}

        {totalImages > 1 && (
          <>
            <button
              type="button"
              className="project-slider-button project-slider-prev"
              onClick={previousImage}
              aria-label="Previous project image"
            >
              ←
            </button>

            <button
              type="button"
              className="project-slider-button project-slider-next"
              onClick={nextImage}
              aria-label="Next project image"
            >
              →
            </button>

            <div className="project-slider-dots">
              {projectImages.map(
                (_, imageIndex) => (
                  <button
                    type="button"
                    key={imageIndex}
                    className={`project-slider-dot ${
                      currentImage === imageIndex
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setCurrentImage(imageIndex)
                    }
                    aria-label={`Go to project image ${
                      imageIndex + 1
                    }`}
                  />
                )
              )}
            </div>
          </>
        )}
      </div>

      <div className="project-content">
        <span className="project-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h4>{project.title}</h4>

        <p>{project.description}</p>

        <div className="project-technologies">
          {Array.isArray(project.technologies) &&
            project.technologies.map(
              (technology) => (
                <span key={technology}>
                  {technology}
                </span>
              )
            )}
        </div>

        {/* Buttons will ALWAYS be visible */}
        <div className="project-links">
          <a
            href={project.liveUrl || "#"}
            target="_blank"
            rel="noreferrer"
          >
            Live Demo
          </a>

          <a
            href={project.githubUrl || "#"}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const [apiProjects, setApiProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showAll, setShowAll] =
    useState(false);

  useEffect(() => {
    projectsScrollAnimation();
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        const dynamicProjects =
          Array.isArray(data) ? data : [];

        /*
          Admin-added projects come first.
          Hard-coded projects remain after them.
        */
        setApiProjects([
          ...dynamicProjects,
          ...staticProjects,
        ]);
      } catch (error) {
        console.error(
          "Projects API error:",
          error
        );

        setApiProjects(staticProjects);

        setError(
          "Unable to load new projects."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  /*
    Only 2 projects initially.

    View All -> all projects.
  */
  const visibleProjects = showAll
    ? apiProjects
    : apiProjects.slice(0, 2);

  if (loading) {
    return (
      <section
        className="projects-section"
        id="projects"
      >
        <div className="projects-container">
          <div className="projects-heading">
            <p>MY WORK</p>

            <h3>
              Featured Projects
            </h3>
          </div>

          <div className="projects-loading">
            Loading projects...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="projects-section"
      id="projects"
    >
      <div className="projects-container">

        <div className="projects-heading">
          <p>MY WORK</p>

          <h3>
            Featured Projects
          </h3>
        </div>

        {error && (
          <div className="projects-error">
            {error}
          </div>
        )}

        <div className="projects-list">
          {visibleProjects.map(
            (project, index) => (
              <ProjectCard
                key={
                  project._id ||
                  `${project.title}-${index}`
                }
                project={project}
                index={index}
              />
            )
          )}
        </div>

        {/* View All button */}
        {apiProjects.length > 2 && (
          <div className="projects-cta">
            <button
              type="button"
              className="projects-view-all"
              onClick={() =>
                setShowAll((prev) => !prev)
              }
            >
              <span>
                {showAll
                  ? "View Less Projects"
                  : "View All Projects"}
              </span>

              <span className="projects-view-arrow">
                {showAll ? "↑" : "→"}
              </span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;
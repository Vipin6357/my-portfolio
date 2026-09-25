import { useEffect, useState } from "react";
import "./Navbar.css";
import resume from "../../assets/resume/Vipin-Gangwar-Resume.pdf";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="navbar">

      <a href="#home" className="navbar-logo" onClick={closeMenu}>
        <span>&lt;</span>
        Vipin
        <span>/&gt;</span>
      </a>

      <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <a href="#home" className={activeSection === "home" ? "active" : ""} onClick={closeMenu}>Home</a>
        <a href="#about" className={activeSection === "about" ? "active" : ""} onClick={closeMenu}>About</a>
        <a href="#skills"  className={activeSection === "skills" ? "active" : ""} onClick={closeMenu}>Skills</a>
        <a href="#projects" className={activeSection === "projects" ? "active" : ""} onClick={closeMenu}>Projects</a>
        <a href="#education"  className={activeSection === "education" ? "active" : ""} onClick={closeMenu}>Education</a>
        <a href="#experience" className={activeSection === "experience" ? "active" : ""} onClick={closeMenu}>Experience</a>
        <a href="#contact"  className={activeSection === "contact" ? "active" : ""} onClick={closeMenu}>Contact</a>
      </nav>

      <div className="navbar-actions">

        <button
          className={`menu-button ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <a
          href={resume}
          className="navbar-button"
          download="Vipin-Gangwar-Resume.pdf"
          onClick={closeMenu}
        >
          Download Resume
        </a>

      </div>

    </header>
  );
}

export default Navbar;
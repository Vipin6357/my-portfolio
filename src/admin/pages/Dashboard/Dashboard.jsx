import { useNavigate } from "react-router-dom";

import ProjectsManager from "../../components/ProjectsManager/ProjectsManager";
import SkillsManager from "../../components/SkillsManager/SkillsManager";
import EducationManager from "../../components/EducationManager/EducationManager";
import ExperienceManager from "../../components/ExperienceManager/ExperienceManager";
import AboutManager from "../../components/AboutManager/AboutManager";
import MessagesManager from "../../components/MessagesManager/MessagesManager";

import {
  getAdminUser,
  logoutAdmin,
} from "../../services/authService";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const admin = getAdminUser();

  const handleLogout = () => {
    logoutAdmin();

    navigate("/admin/login", {
      replace: true,
    });
  };

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main className="admin-dashboard">


      <aside className="admin-sidebar">

        <div className="admin-sidebar-top">

          <a
            href="/admin/dashboard"
            className="admin-dashboard-logo"
          >
            V<span>I</span>P<span>I</span>N{" "}
            <span>G</span>A<span>N</span>G
            <span>W</span>A<span>R</span>
          </a>

          <p className="admin-sidebar-label">
            ADMIN PANEL
          </p>

          <nav className="admin-sidebar-nav">


            <a
              href="/admin/dashboard"
              className="admin-nav-link active"
            >
              <span>01</span>
              Dashboard
            </a>


            <button
              type="button"
              className="admin-nav-link"
              onClick={() =>
                scrollToSection(
                  "projects-manager"
                )
              }
            >
              <span>02</span>
              Projects
            </button>

   

            <button
              type="button"
              className="admin-nav-link"
              onClick={() =>
                scrollToSection(
                  "skills-manager"
                )
              }
            >
              <span>03</span>
              Skills
            </button>



            <button
              type="button"
              className="admin-nav-link"
              onClick={() => {
                document
                  .getElementById("education-manager")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              <span>04</span>
              Education
            </button>


            <button
              type="button"
              className="admin-nav-link"
              onClick={() => {
                document
                  .getElementById("experience-manager")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              <span>05</span>
              Experience
            </button>


            <button
              type="button"
              className="admin-nav-link"
              onClick={() =>
                document
                  .getElementById("about-manager")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              <span>06</span>
              About
            </button>



            <button
              type="button"
              className="admin-nav-link"
              onClick={() => {
                document
                  .getElementById("messages-manager")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              <span>07</span>
              Messages
            </button>

          </nav>
        </div>



        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          Logout
          <span>↗</span>
        </button>

      </aside>

      <section className="admin-dashboard-content">


        <header className="admin-dashboard-header">

          <div>

            <p className="admin-dashboard-eyebrow">
              ADMIN DASHBOARD
            </p>

            <h1>
              Welcome back
              {admin?.name
                ? `, ${admin.name}`
                : ""}
            </h1>

            <p>
              Manage your portfolio content
              from one place.
            </p>

          </div>

          <div className="admin-user-info">

            <span className="admin-user-role">
              ADMIN
            </span>

            <span className="admin-user-email">
              {admin?.email ||
                "Admin"}
            </span>

          </div>

        </header>



        <div className="admin-dashboard-grid">


          <div className="admin-dashboard-card">

            <span className="admin-card-number">
              01
            </span>

            <h2>
              Projects
            </h2>

            <p>
              Add, edit and remove
              portfolio projects.
            </p>

            <button
              type="button"
              className="admin-card-status"
              onClick={() =>
                scrollToSection(
                  "projects-manager"
                )
              }
            >
              Manage Projects
            </button>

          </div>

          <div className="admin-dashboard-card">

            <span className="admin-card-number">
              02
            </span>

            <h2>
              Skills
            </h2>

            <p>
              Manage your technology
              stack and skills.
            </p>

            <button
              type="button"
              className="admin-card-status"
              onClick={() =>
                scrollToSection(
                  "skills-manager"
                )
              }
            >
              Manage Skills
            </button>

          </div>


          <div className="admin-dashboard-card">

            <span className="admin-card-number">
              03
            </span>

            <h2>
              Education
            </h2>

            <p>
              Update education and
              academic information.
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("education-manager")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Manage Education
            </button>

          </div>


          <div className="admin-dashboard-card">

            <span className="admin-card-number">
              04
            </span>

            <h2>
              Experience
            </h2>

            <p>
              Manage professional
              experience entries.
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("experience-manager")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Manage Experience
            </button>

          </div>


          <div className="admin-dashboard-card">

            <span className="admin-card-number">
              05
            </span>

            <h2>
              About
            </h2>

            <p>
              Update your portfolio
              introduction.
            </p>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("about-manager")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Manage About
            </button>

          </div>


          <div className="admin-dashboard-card">

            <span className="admin-card-number">
              06
            </span>

            <h2>
              Messages
            </h2>

            <p>
              View messages received
              through your contact form.
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("messages-manager")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Manage Messages
            </button>

          </div>

        </div>

        <div id="projects-manager">
          <ProjectsManager />
        </div>


        <div id="skills-manager-wrapper">
          <SkillsManager />
        </div>

        <div id="education-manager">
          <EducationManager />
        </div>

        <div id="experience-manager">
          <ExperienceManager />
        </div>

        <div id="about-manager">
          <AboutManager />
        </div>

        <div id="messages-manager">
          <MessagesManager />
        </div>

      </section>

    </main>
  );
}

export default Dashboard;
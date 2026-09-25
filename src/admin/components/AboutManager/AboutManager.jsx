import {
  useEffect,
  useState,
} from "react";

import {
  getAdminAbout,
  updateAbout,
} from "../../services/aboutAdminService";

import "./AboutManager.css";

const defaultForm = {
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


const AboutManager = () => {
  const [form, setForm] =
    useState(defaultForm);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  const loadAbout = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminAbout();

      if (data) {
        setForm({
          heading:
            data.heading || "",

          role:
            data.role || "",

          mainTitle:
            data.mainTitle || "",

          description:
            data.description || "",

          stats:
            Array.isArray(data.stats)
              ? data.stats
              : defaultForm.stats,
        });
      }
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to load About section."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadAbout();
  }, []);


  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleStatChange = (
    index,
    field,
    value
  ) => {
    setForm((previous) => {
      const updatedStats = [
        ...previous.stats,
      ];

      updatedStats[index] = {
        ...updatedStats[index],
        [field]: value,
      };

      return {
        ...previous,
        stats: updatedStats,
      };
    });
  };


  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const cleanedStats =
        form.stats.map(
          (stat) => ({
            value:
              stat.value.trim(),

            label:
              stat.label.trim(),
          })
        );

      await updateAbout({
        heading:
          form.heading.trim(),

        role:
          form.role.trim(),

        mainTitle:
          form.mainTitle.trim(),

        description:
          form.description.trim(),

        stats: cleanedStats,
      });

      setSuccess(
        "About section updated successfully."
      );

      await loadAbout();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to update About section."
      );
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <section
        id="about-manager"
        className="about-manager"
      >
        <div className="about-manager-loading">
          Loading About section...
        </div>
      </section>
    );
  }


  return (
    <section
      id="about-manager"
      className="about-manager"
    >
      <div className="about-manager-header">

        <div>
          <span className="about-manager-eyebrow">
            ADMIN PANEL
          </span>

          <h2>
            About Manager
          </h2>

          <p>
            Update the content displayed
            in your portfolio About section.
          </p>
        </div>

      </div>


      {error && (
        <div className="about-message about-error">
          {error}
        </div>
      )}


      {success && (
        <div className="about-message about-success">
          {success}
        </div>
      )}


      <form
        className="about-manager-form"
        onSubmit={handleSubmit}
      >

        {/* FIXED SECTION LABEL */}

        <div className="about-fixed-info">
          <div>
            <span>
              FIXED
            </span>

            <strong>
              ABOUT ME
            </strong>
          </div>

          <p>
            This section label cannot be
            changed from the Admin Panel.
          </p>
        </div>


        {/* IMAGE */}

        <div className="about-fixed-info">
          <div>
            <span>
              FIXED
            </span>

            <strong>
              PROFILE IMAGE
            </strong>
          </div>

          <p>
            The current About image is
            permanently controlled by the
            portfolio source and cannot be
            changed here.
          </p>
        </div>


        {/* HEADING */}

        <div className="about-field">
          <label htmlFor="about-heading">
            About Heading
          </label>

          <input
            id="about-heading"
            type="text"
            name="heading"
            value={form.heading}
            onChange={handleChange}
            placeholder="Building ideas into digital experiences."
            required
          />

          <small>
            This is the large heading under
            ABOUT ME.
          </small>
        </div>


        {/* ROLE */}

        <div className="about-field">
          <label htmlFor="about-role">
            Role
          </label>

          <input
            id="about-role"
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="MERN Stack Developer"
            required
          />
        </div>


        {/* MAIN TITLE */}

        <div className="about-field">
          <label htmlFor="about-main-title">
            Main Title
          </label>

          <textarea
            id="about-main-title"
            name="mainTitle"
            value={form.mainTitle}
            onChange={handleChange}
            placeholder="I build modern, scalable and interactive web applications."
            rows="3"
            required
          />
        </div>


        {/* DESCRIPTION */}

        <div className="about-field">
          <label htmlFor="about-description">
            Description
          </label>

          <textarea
            id="about-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write your About description..."
            rows="6"
            required
          />
        </div>


        {/* STATS */}

        <div className="about-stats-manager">

          <div className="about-stats-heading">
            <div>
              <span>
                EDITABLE
              </span>

              <h3>
                About Statistics
              </h3>
            </div>

            <p>
              Update the value and label
              shown in each card.
            </p>
          </div>


          <div className="about-stats-grid">

            {form.stats.map(
              (stat, index) => (
                <div
                  className="about-stat-manager-card"
                  key={index}
                >
                  <span className="about-stat-number">
                    0{index + 1}
                  </span>

                  <div className="about-field">
                    <label>
                      Value
                    </label>

                    <input
                      type="text"
                      value={
                        stat.value
                      }
                      onChange={(event) =>
                        handleStatChange(
                          index,
                          "value",
                          event.target.value
                        )
                      }
                      placeholder="2+"
                      required
                    />
                  </div>


                  <div className="about-field">
                    <label>
                      Label
                    </label>

                    <input
                      type="text"
                      value={
                        stat.label
                      }
                      onChange={(event) =>
                        handleStatChange(
                          index,
                          "label",
                          event.target.value
                        )
                      }
                      placeholder="Full Stack Projects"
                      required
                    />
                  </div>

                </div>
              )
            )}

          </div>
        </div>


        <div className="about-form-actions">

          <button
            type="submit"
            className="about-save-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save About Changes"}
          </button>

        </div>

      </form>

    </section>
  );
};

export default AboutManager;
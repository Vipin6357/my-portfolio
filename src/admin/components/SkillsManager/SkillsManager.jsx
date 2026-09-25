import { useEffect, useState } from "react";

import {
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../services/skillAdminService";

import "./SkillsManager.css";

const categories = [
  "Programming Languages",
  "Frontend",
  "Backend",
  "Real-Time & Authentication",
  "Databases",
  "Developer Tools",
  "Core Concepts",
];

const emptyForm = {
  name: "",
  category: "Frontend",
  icon: "",
};

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminSkills();

      setSkills(data);
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Failed to load skills."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const skillName = form.name.trim();

    if (!skillName) {
      setError("Please enter a skill name.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const skillData = {
        name: skillName,
        category: form.category,
        icon: form.icon.trim(),
      };

      if (editingId) {
        await updateSkill(
          editingId,
          skillData
        );

        setSuccess(
          "Skill updated successfully."
        );
      } else {
        await createSkill(skillData);

        setSuccess(
          "Skill added successfully."
        );
      }

      resetForm();

      await loadSkills();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);

    setForm({
      name: skill.name || "",
      category:
        skill.category || "Frontend",
      icon: skill.icon || "",
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      await deleteSkill(id);

      setSuccess(
        "Skill deleted successfully."
      );

      if (editingId === id) {
        resetForm();
      }

      await loadSkills();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to delete skill."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <section
        id="skills-manager"
        className="skills-manager"
      >
        <div className="skills-manager-loading">
          Loading skills...
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills-manager"
      className="skills-manager"
    >
      <div className="skills-manager-header">
        <div>
          <span className="skills-manager-eyebrow">
            ADMIN PANEL
          </span>

          <h2>Skills Manager</h2>

          <p>
            Manage the skills displayed on
            your portfolio.
          </p>
        </div>
      </div>

      {error && (
        <div className="skills-message skills-error">
          {error}
        </div>
      )}

      {success && (
        <div className="skills-message skills-success">
          {success}
        </div>
      )}

      <form
        className="skills-form"
        onSubmit={handleSubmit}
      >
        <div className="skills-form-header">
          <div>
            <span>
              {editingId
                ? "EDIT SKILL"
                : "ADD NEW SKILL"}
            </span>

            <h3>
              {editingId
                ? "Update skill"
                : "Add a skill"}
            </h3>
          </div>

          {editingId && (
            <button
              type="button"
              className="skills-cancel-button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>

        <div className="skills-form-grid">
          <div className="skills-field">
            <label htmlFor="skill-name">
              Skill Name
            </label>

            <input
              id="skill-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. React.js"
              autoComplete="off"
              required
            />
          </div>

          <div className="skills-field">
            <label htmlFor="skill-category">
              Category
            </label>

            <select
              id="skill-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <option
                  value={category}
                  key={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="skills-field skills-field-full">
            <label htmlFor="skill-icon">
              Icon
            </label>

            <input
              id="skill-icon"
              type="text"
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="e.g. react, node, mongodb"
              autoComplete="off"
            />

            <small>
              Optional. Enter an icon name such as
              react, node, mongodb, git or docker.
            </small>
          </div>
        </div>

        <div className="skills-form-actions">
          <button
            type="submit"
            className="skills-submit-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Skill"
              : "Add Skill"}
          </button>

          {editingId && (
            <button
              type="button"
              className="skills-secondary-button"
              onClick={resetForm}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="skills-list-section">
        <div className="skills-list-header">
          <div>
            <span>YOUR DYNAMIC SKILLS</span>

            <h3>
              {skills.length}{" "}
              {skills.length === 1
                ? "Skill"
                : "Skills"}
            </h3>
          </div>
        </div>

        {skills.length === 0 ? (
          <div className="skills-empty">
            <div className="skills-empty-icon">
              +
            </div>

            <h3>No skills found.</h3>

            <p>
              Add your first skill using the
              form above.
            </p>
          </div>
        ) : (
          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Category</th>
                  <th>Icon</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {skills.map((skill) => (
                  <tr key={skill._id}>
                    <td>
                      <span className="skill-table-name">
                        {skill.name}
                      </span>
                    </td>

                    <td>
                      <span className="skill-category-badge">
                        {skill.category}
                      </span>
                    </td>

                    <td>
                      <span className="skill-icon-value">
                        {skill.icon || "—"}
                      </span>
                    </td>

                    <td>
                      <div className="skill-actions">
                        <button
                          type="button"
                          className="skill-edit-button"
                          onClick={() =>
                            handleEdit(skill)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="skill-delete-button"
                          onClick={() =>
                            handleDelete(
                              skill._id
                            )
                          }
                          disabled={
                            deletingId ===
                            skill._id
                          }
                        >
                          {deletingId ===
                          skill._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsManager;
import { useEffect, useState } from "react";

import {
  getAdminExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../services/experienceAdminService";

import "./ExperienceManager.css";

const emptyForm = {
  duration: "",
  type: "",
  role: "",
  company: "",
  location: "",
  responsibilities: [""],
};

const ExperienceManager = () => {
  const [experiences, setExperiences] =
    useState([]);

  const [form, setForm] =
    useState(emptyForm);

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminExperiences();

      setExperiences(data);
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to load experiences."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleResponsibilityChange = (
    index,
    value
  ) => {
    setForm((previous) => {
      const responsibilities = [
        ...previous.responsibilities,
      ];

      responsibilities[index] =
        value;

      return {
        ...previous,
        responsibilities,
      };
    });
  };

  const addResponsibility = () => {
    setForm((previous) => ({
      ...previous,
      responsibilities: [
        ...previous.responsibilities,
        "",
      ],
    }));
  };

  const removeResponsibility = (
    index
  ) => {
    setForm((previous) => {
      if (
        previous.responsibilities
          .length === 1
      ) {
        return previous;
      }

      return {
        ...previous,
        responsibilities:
          previous.responsibilities.filter(
            (_, itemIndex) =>
              itemIndex !== index
          ),
      };
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const cleanedResponsibilities =
      form.responsibilities
        .map((item) => item.trim())
        .filter(Boolean);

    if (
      !form.duration.trim() ||
      !form.type.trim() ||
      !form.role.trim() ||
      !form.company.trim() ||
      !form.location.trim()
    ) {
      setError(
        "Please fill all experience fields."
      );
      return;
    }

    if (
      cleanedResponsibilities.length ===
      0
    ) {
      setError(
        "Please add at least one responsibility."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const experienceData = {
        duration:
          form.duration.trim(),

        type:
          form.type.trim(),

        role:
          form.role.trim(),

        company:
          form.company.trim(),

        location:
          form.location.trim(),

        responsibilities:
          cleanedResponsibilities,
      };

      if (editingId) {
        await updateExperience(
          editingId,
          experienceData
        );

        setSuccess(
          "Experience updated successfully."
        );
      } else {
        await createExperience(
          experienceData
        );

        setSuccess(
          "Experience added successfully."
        );
      }

      resetForm();

      await loadExperiences();
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

  const handleEdit = (
    experience
  ) => {
    setEditingId(
      experience._id
    );

    setForm({
      duration:
        experience.duration || "",

      type:
        experience.type || "",

      role:
        experience.role || "",

      company:
        experience.company || "",

      location:
        experience.location || "",

      responsibilities:
        Array.isArray(
          experience.responsibilities
        ) &&
        experience.responsibilities.length
          ? experience.responsibilities
          : [""],
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this experience?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      await deleteExperience(id);

      setSuccess(
        "Experience deleted successfully."
      );

      if (editingId === id) {
        resetForm();
      }

      await loadExperiences();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to delete experience."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <section
        id="experience-manager"
        className="experience-manager"
      >
        <div className="experience-manager-loading">
          Loading experiences...
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience-manager"
      className="experience-manager"
    >
      <div className="experience-manager-header">
        <div>
          <span className="experience-manager-eyebrow">
            ADMIN PANEL
          </span>

          <h2>
            Experience Manager
          </h2>

          <p>
            Manage additional professional
            experience displayed on your
            portfolio.
          </p>
        </div>
      </div>

      {error && (
        <div className="experience-message experience-error">
          {error}
        </div>
      )}

      {success && (
        <div className="experience-message experience-success">
          {success}
        </div>
      )}

      <form
        className="experience-manager-form"
        onSubmit={handleSubmit}
      >
        <div className="experience-form-header">
          <div>
            <span>
              {editingId
                ? "EDIT EXPERIENCE"
                : "ADD NEW EXPERIENCE"}
            </span>

            <h3>
              {editingId
                ? "Update experience"
                : "Add an experience"}
            </h3>
          </div>

          {editingId && (
            <button
              type="button"
              className="experience-cancel-button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>

        <div className="experience-form-grid">

          <div className="experience-field">
            <label htmlFor="experience-duration">
              Duration
            </label>

            <input
              id="experience-duration"
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g. Jan 2026 — Mar 2026"
              required
            />
          </div>

          <div className="experience-field">
            <label htmlFor="experience-type">
              Experience Type
            </label>

            <input
              id="experience-type"
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="e.g. Professional Experience"
              required
            />
          </div>

          <div className="experience-field">
            <label htmlFor="experience-role">
              Role
            </label>

            <input
              id="experience-role"
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. MERN Full Stack Development"
              required
            />
          </div>

          <div className="experience-field">
            <label htmlFor="experience-company">
              Company
            </label>

            <input
              id="experience-company"
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. EduSkills"
              required
            />
          </div>

          <div className="experience-field experience-field-full">
            <label htmlFor="experience-location">
              Location
            </label>

            <input
              id="experience-location"
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Remote, UAE"
              required
            />
          </div>

        </div>

        <div className="experience-responsibility-form">
          <div className="experience-responsibility-header">
            <div>
              <label>
                Responsibilities
              </label>

              <small>
                Add the work/responsibilities
                you want to show as bullet
                points.
              </small>
            </div>

            <button
              type="button"
              className="add-responsibility-button"
              onClick={
                addResponsibility
              }
            >
              + Add Point
            </button>
          </div>

          <div className="responsibility-input-list">
            {form.responsibilities.map(
              (
                responsibility,
                index
              ) => (
                <div
                  className="responsibility-input-row"
                  key={index}
                >
                  <span>
                    {index + 1}
                  </span>

                  <input
                    type="text"
                    value={
                      responsibility
                    }
                    onChange={(event) =>
                      handleResponsibilityChange(
                        index,
                        event.target
                          .value
                      )
                    }
                    placeholder={`Responsibility ${
                      index + 1
                    }`}
                  />

                  <button
                    type="button"
                    className="remove-responsibility-button"
                    onClick={() =>
                      removeResponsibility(
                        index
                      )
                    }
                    disabled={
                      form
                        .responsibilities
                        .length === 1
                    }
                  >
                    ×
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <div className="experience-form-actions">
          <button
            type="submit"
            className="experience-submit-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Experience"
              : "Add Experience"}
          </button>

          {editingId && (
            <button
              type="button"
              className="experience-secondary-button"
              onClick={resetForm}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="experience-list-section">
        <div className="experience-list-header">
          <span>
            YOUR DYNAMIC EXPERIENCES
          </span>

          <h3>
            {experiences.length}{" "}
            {experiences.length === 1
              ? "Experience"
              : "Experiences"}
          </h3>
        </div>

        {experiences.length === 0 ? (
          <div className="experience-empty">
            <div className="experience-empty-icon">
              +
            </div>

            <h3>
              No experiences found.
            </h3>

            <p>
              Add your first experience
              using the form above.
            </p>
          </div>
        ) : (
          <div className="experience-admin-list">
            {experiences.map(
              (experience) => (
                <article
                  className="experience-admin-card"
                  key={experience._id}
                >
                  <div className="experience-admin-top">
                    <span>
                      {experience.duration}
                    </span>

                    <span>
                      {experience.type}
                    </span>
                  </div>

                  <h3>
                    {experience.role}
                  </h3>

                  <h4>
                    {experience.company}
                  </h4>

                  <p className="experience-admin-location">
                    {experience.location}
                  </p>

                  <ul className="experience-admin-responsibilities">
                    {experience.responsibilities.map(
                      (
                        responsibility,
                        index
                      ) => (
                        <li
                          key={index}
                        >
                          {
                            responsibility
                          }
                        </li>
                      )
                    )}
                  </ul>

                  <div className="experience-admin-actions">
                    <button
                      type="button"
                      className="experience-edit-button"
                      onClick={() =>
                        handleEdit(
                          experience
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="experience-delete-button"
                      onClick={() =>
                        handleDelete(
                          experience._id
                        )
                      }
                      disabled={
                        deletingId ===
                        experience._id
                      }
                    >
                      {deletingId ===
                      experience._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceManager;
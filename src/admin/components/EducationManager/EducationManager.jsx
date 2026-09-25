import { useEffect, useState } from "react";

import {
  getAdminEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../../services/educationAdminService";

import "./EducationManager.css";

const emptyForm = {
  duration: "",
  status: "",
  degree: "",
  field: "",
  institute: "",
  description: "",
};

const EducationManager = () => {
  const [educations, setEducations] =
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

  const loadEducations = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminEducations();

      setEducations(data);
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to load education."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducations();
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

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const requiredFields = [
      "duration",
      "status",
      "degree",
      "field",
      "institute",
      "description",
    ];

    const hasEmptyField =
      requiredFields.some(
        (field) =>
          !form[field].trim()
      );

    if (hasEmptyField) {
      setError(
        "Please fill all education fields."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const educationData = {
        duration:
          form.duration.trim(),

        status:
          form.status.trim(),

        degree:
          form.degree.trim(),

        field:
          form.field.trim(),

        institute:
          form.institute.trim(),

        description:
          form.description.trim(),
      };

      if (editingId) {
        await updateEducation(
          editingId,
          educationData
        );

        setSuccess(
          "Education updated successfully."
        );
      } else {
        await createEducation(
          educationData
        );

        setSuccess(
          "Education added successfully."
        );
      }

      resetForm();

      await loadEducations();
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
    education
  ) => {
    setEditingId(
      education._id
    );

    setForm({
      duration:
        education.duration || "",

      status:
        education.status || "",

      degree:
        education.degree || "",

      field:
        education.field || "",

      institute:
        education.institute || "",

      description:
        education.description || "",
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
        "Are you sure you want to delete this education entry?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      await deleteEducation(id);

      setSuccess(
        "Education deleted successfully."
      );

      if (editingId === id) {
        resetForm();
      }

      await loadEducations();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to delete education."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <section
        id="education-manager"
        className="education-manager"
      >
        <div className="education-manager-loading">
          Loading education...
        </div>
      </section>
    );
  }

  return (
    <section
      id="education-manager"
      className="education-manager"
    >
      <div className="education-manager-header">
        <div>
          <span className="education-manager-eyebrow">
            ADMIN PANEL
          </span>

          <h2>
            Education Manager
          </h2>

          <p>
            Manage additional education
            entries displayed on your
            portfolio.
          </p>
        </div>
      </div>

      {error && (
        <div className="education-message education-error">
          {error}
        </div>
      )}

      {success && (
        <div className="education-message education-success">
          {success}
        </div>
      )}

      <form
        className="education-manager-form"
        onSubmit={handleSubmit}
      >
        <div className="education-form-header">
          <div>
            <span>
              {editingId
                ? "EDIT EDUCATION"
                : "ADD NEW EDUCATION"}
            </span>

            <h3>
              {editingId
                ? "Update education"
                : "Add an education entry"}
            </h3>
          </div>

          {editingId && (
            <button
              type="button"
              className="education-cancel-button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>

        <div className="education-form-grid">

          <div className="education-field">
            <label htmlFor="education-duration">
              Duration / Year
            </label>

            <input
              id="education-duration"
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g. 2023 — 2027"
              required
            />
          </div>

          <div className="education-field">
            <label htmlFor="education-status">
              Status / Board
            </label>

            <input
              id="education-status"
              type="text"
              name="status"
              value={form.status}
              onChange={handleChange}
              placeholder="e.g. Currently Pursuing / CBSE"
              required
            />
          </div>

          <div className="education-field">
            <label htmlFor="education-degree">
              Degree / Qualification
            </label>

            <input
              id="education-degree"
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="e.g. Bachelor of Technology (B.Tech)"
              required
            />
          </div>

          <div className="education-field">
            <label htmlFor="education-field">
              Field / Subject
            </label>

            <input
              id="education-field"
              type="text"
              name="field"
              value={form.field}
              onChange={handleChange}
              placeholder="e.g. Computer Science and Engineering"
              required
            />
          </div>

          <div className="education-field education-field-full">
            <label htmlFor="education-institute">
              Institute
            </label>

            <input
              id="education-institute"
              type="text"
              name="institute"
              value={form.institute}
              onChange={handleChange}
              placeholder="e.g. Invertis University, Bareilly, Uttar Pradesh"
              required
            />
          </div>

          <div className="education-field education-field-full">
            <label htmlFor="education-description">
              Description
            </label>

            <textarea
              id="education-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description about this education..."
              rows="5"
              required
            />
          </div>

        </div>

        <div className="education-form-actions">
          <button
            type="submit"
            className="education-submit-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Education"
              : "Add Education"}
          </button>

          {editingId && (
            <button
              type="button"
              className="education-secondary-button"
              onClick={resetForm}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="education-list-section">
        <div className="education-list-header">
          <span>
            YOUR DYNAMIC EDUCATION
          </span>

          <h3>
            {educations.length}{" "}
            {educations.length === 1
              ? "Entry"
              : "Entries"}
          </h3>
        </div>

        {educations.length === 0 ? (
          <div className="education-empty">
            <div className="education-empty-icon">
              +
            </div>

            <h3>
              No education entries found.
            </h3>

            <p>
              Add your first education
              entry using the form above.
            </p>
          </div>
        ) : (
          <div className="education-admin-list">
            {educations.map(
              (education) => (
                <article
                  className="education-admin-card"
                  key={education._id}
                >
                  <div className="education-admin-card-top">
                    <span>
                      {education.duration}
                    </span>

                    <span>
                      {education.status}
                    </span>
                  </div>

                  <h3>
                    {education.degree}
                  </h3>

                  <h4>
                    {education.field}
                  </h4>

                  <p className="education-admin-institute">
                    {education.institute}
                  </p>

                  <p className="education-admin-description">
                    {education.description}
                  </p>

                  <div className="education-admin-actions">
                    <button
                      type="button"
                      className="education-edit-button"
                      onClick={() =>
                        handleEdit(
                          education
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="education-delete-button"
                      onClick={() =>
                        handleDelete(
                          education._id
                        )
                      }
                      disabled={
                        deletingId ===
                        education._id
                      }
                    >
                      {deletingId ===
                      education._id
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

export default EducationManager;
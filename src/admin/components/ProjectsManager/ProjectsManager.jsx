import { useEffect, useState } from "react";

import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectAdminService";

import "./ProjectsManager.css";

const emptyForm = {
  title: "",
  description: "",
  technologies: "",
  images: [],
  githubUrl: "",
  liveUrl: "",
  featured: false,
  order: 1,
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

 

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminProjects();

      setProjects(data);
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);



  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = event.target;

    if (type === "file") {
      const selectedFiles = Array.from(files);

      setForm((previous) => ({
        ...previous,
        images: [
          ...previous.images,
          ...selectedFiles.filter(
            (newFile) =>
              !previous.images.some(
                (oldFile) =>
                  oldFile.name === newFile.name &&
                  oldFile.size === newFile.size &&
                  oldFile.lastModified ===
                    newFile.lastModified
              )
          ),
        ],
      }));

      event.target.value = "";

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const removeSelectedImage = (indexToRemove) => {
    setForm((previous) => ({
      ...previous,
      images: previous.images.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

        const projectData = {
          title: form.title.trim(),

          description:
            form.description.trim(),

          technologies: form.technologies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

          images: form.images,

          githubUrl:
            form.githubUrl.trim(),

          liveUrl:
            form.liveUrl.trim(),

          featured: form.featured,

          order: Math.max(
            1,
            Number(form.order) || 1
          ),
        };

      if (editingId) {
        await updateProject(
          editingId,
          projectData
        );

        setSuccess(
          "Project updated successfully."
        );
      } else {
        await createProject(projectData);

        setSuccess(
          "Project created successfully."
        );
      }

      resetForm();

      await loadProjects();
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

  

  const handleEdit = (project) => {
    setEditingId(project._id);

    setForm({
      title: project.title || "",

      description:
        project.description || "",

      technologies:
        project.technologies?.join(", ") ||
        "",

      images: [],

      githubUrl:
        project.githubUrl || "",

      liveUrl:
        project.liveUrl || "",

      featured:
        project.featured || false,

      order:
        project.order || 0,
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteProject(id);

      setSuccess(
        "Project deleted successfully."
      );

      await loadProjects();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to delete project."
      );
    }
  };

 

  if (loading) {
    return (
      <div className="projects-manager">
        <div className="projects-manager-loading">
          Loading projects...
        </div>
      </div>
    );
  }



  return (
    <div className="projects-manager">

      <div className="projects-manager-header">
        <div>
          <span className="projects-manager-label">
            ADMIN PANEL
          </span>

          <h2>Projects Manager</h2>

          <p>
            Manage projects that are stored
            in your database.
          </p>
        </div>
      </div>

      {error && (
        <div className="projects-message error">
          {error}
        </div>
      )}

      {success && (
        <div className="projects-message success">
          {success}
        </div>
      )}

    

      <form
        className="project-form"
        onSubmit={handleSubmit}
      >
        <div className="form-heading">
          <h3>
            {editingId
              ? "Edit Project"
              : "Add New Project"}
          </h3>

          {editingId && (
            <button
              type="button"
              className="cancel-button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="title">
            Project Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Portfolio Website"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your project..."
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="technologies">
            Technologies
          </label>

          <input
            id="technologies"
            name="technologies"
            type="text"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
          />

          <small>
            Separate technologies with commas.
          </small>
        </div>

       <div className="form-group">
          <label htmlFor="images">
            Project Images
          </label>

          <input
            id="images"
            name="images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleChange}
          />

          <small>
            Select multiple images. Maximum 10
            images, 5MB each.
          </small>

          {form.images.length > 0 && (
            <div className="selected-images">
              {form.images.map(
                (image, index) => (
                  <div
                    className="selected-image"
                    key={`${image.name}-${index}`}
                  >
                    <div>
                      <span>
                        {image.name}
                      </span>

                      <span>
                        {(
                          image.size /
                          (1024 * 1024)
                        ).toFixed(2)}{" "}
                        MB
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeSelectedImage(index)
                      }
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="form-row">

          <div className="form-group">
            <label htmlFor="githubUrl">
              GitHub URL
            </label>

            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              value={form.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="liveUrl">
              Live Demo URL
            </label>

            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              value={form.liveUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group checkbox-group">

            <label>
              <input
                name="featured"
                type="checkbox"
                checked={form.featured}
                onChange={handleChange}
              />

              <span>
                Featured Project
              </span>
            </label>

          </div>

          <div className="form-group">
            <label htmlFor="order">
              Display Order
            </label>

            <input
              id="order"
              name="order"
              type="number"
              value={form.order}
              onChange={handleChange}
              min="1"
            />
          </div>

        </div>

        <button
          type="submit"
          className="submit-project-button"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : editingId
            ? "Update Project"
            : "Add Project"}
        </button>
      </form>

    

      <div className="admin-projects-list">

        <div className="list-heading">
          <h3>
            Database Projects
          </h3>

          <span>
            {projects.length} project
            {projects.length !== 1
              ? "s"
              : ""}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="empty-projects">
            No database projects found.
          </div>
        ) : (
          <div className="admin-project-grid">

            {projects.map((project) => (
              <article
                className="admin-project-card"
                key={project._id}
              >

                <div className="admin-project-card-content">

                  <div className="admin-project-title-row">

                    <h4>
                      {project.title}
                    </h4>

                    {project.featured && (
                      <span className="featured-badge">
                        Featured
                      </span>
                    )}

                  </div>

                  <p>
                    {project.description}
                  </p>

                  <div className="admin-project-tech">

                    {project.technologies?.map(
                      (technology, index) => (
                        <span
                          key={`${technology}-${index}`}
                        >
                          {technology}
                        </span>
                      )
                    )}

                  </div>

                  <div className="admin-project-meta">
                    <span>
                      Images:{" "}
                      {project.images?.length ||
                        0}
                    </span>

                    <span>
                      Order:{" "}
                      {project.order || 0}
                    </span>
                  </div>

                </div>

                <div className="admin-project-actions">

                  <button
                    type="button"
                    className="edit-project-button"
                    onClick={() =>
                      handleEdit(project)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-project-button"
                    onClick={() =>
                      handleDelete(
                        project._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </article>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default ProjectsManager;
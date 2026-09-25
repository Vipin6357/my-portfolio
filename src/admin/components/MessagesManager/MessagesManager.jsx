import {
  useEffect,
  useState,
} from "react";

import {
  getAdminMessages,
  createAdminMessage,
  updateAdminMessage,
  toggleAdminMessageStatus,
  deleteAdminMessage,
} from "../../services/messageAdminService";

import "./MessagesManager.css";

const emptyForm = {
  name: "",
  email: "",
  message: "",
  status: "unread",
};

const MessagesManager = () => {
  const [messages, setMessages] =
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


  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminMessages();

      setMessages(data);
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to load messages."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadMessages();
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


  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };


  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingId) {
        await updateAdminMessage(
          editingId,
          form
        );

        setSuccess(
          "Message updated successfully."
        );
      } else {
        await createAdminMessage(
          form
        );

        setSuccess(
          "Message added successfully."
        );
      }

      resetForm();

      await loadMessages();
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
    message
  ) => {
    setEditingId(
      message._id
    );

    setForm({
      name:
        message.name || "",

      email:
        message.email || "",

      message:
        message.message || "",

      status:
        message.status || "unread",
    });

    setError("");
    setSuccess("");

    document
      .getElementById(
        "messages-manager"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };


  const handleStatus = async (
    id
  ) => {
    try {
      setError("");
      setSuccess("");

      await toggleAdminMessageStatus(
        id
      );

      await loadMessages();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to update status."
      );
    }
  };


  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this message?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      await deleteAdminMessage(
        id
      );

      setSuccess(
        "Message deleted successfully."
      );

      if (editingId === id) {
        resetForm();
      }

      await loadMessages();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to delete message."
      );
    } finally {
      setDeletingId(null);
    }
  };


  if (loading) {
    return (
      <section
        id="messages-manager"
        className="messages-manager"
      >
        <div className="messages-loading">
          Loading messages...
        </div>
      </section>
    );
  }


  const unreadCount =
    messages.filter(
      (message) =>
        message.status ===
        "unread"
    ).length;


  return (
    <section
      id="messages-manager"
      className="messages-manager"
    >

      <div className="messages-header">

        <div>
          <span className="messages-eyebrow">
            ADMIN PANEL
          </span>

          <h2>
            Messages Manager
          </h2>

          <p>
            View and manage messages
            received through your portfolio
            contact form.
          </p>
        </div>

        <div className="messages-summary">
          <span>
            TOTAL
          </span>

          <strong>
            {messages.length}
          </strong>

          <small>
            {unreadCount} unread
          </small>
        </div>

      </div>


      {error && (
        <div className="message-alert message-alert-error">
          {error}
        </div>
      )}


      {success && (
        <div className="message-alert message-alert-success">
          {success}
        </div>
      )}


      {/* FORM */}

      <form
        className="messages-form"
        onSubmit={handleSubmit}
      >

        <div className="messages-form-header">

          <div>
            <span>
              {editingId
                ? "EDIT MESSAGE"
                : "ADD MESSAGE"}
            </span>

            <h3>
              {editingId
                ? "Update message"
                : "Add a message"}
            </h3>
          </div>

          {editingId && (
            <button
              type="button"
              className="messages-cancel-button"
              onClick={
                resetForm
              }
            >
              Cancel
            </button>
          )}

        </div>


        <div className="messages-form-grid">

          <div className="message-field">
            <label>
              Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              placeholder="Visitor name"
              required
            />
          </div>


          <div className="message-field">
            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={
                handleChange
              }
              placeholder="visitor@email.com"
              required
            />
          </div>

        </div>


        <div className="message-field">
          <label>
            Message
          </label>

          <textarea
            name="message"
            value={form.message}
            onChange={
              handleChange
            }
            placeholder="Message content..."
            rows="6"
            required
          />
        </div>


        <div className="message-field message-status-field">

          <label>
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={
              handleChange
            }
          >
            <option value="unread">
              Unread
            </option>

            <option value="read">
              Read
            </option>
          </select>

        </div>


        <div className="messages-form-actions">

          <button
            type="submit"
            className="messages-save-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Message"
              : "Add Message"}
          </button>

          {editingId && (
            <button
              type="button"
              className="messages-secondary-button"
              onClick={
                resetForm
              }
            >
              Cancel
            </button>
          )}

        </div>

      </form>


      {/* MESSAGE LIST */}

      <div className="messages-list-section">

        <div className="messages-list-heading">

          <div>
            <span>
              INBOX
            </span>

            <h3>
              {messages.length}{" "}
              {messages.length === 1
                ? "Message"
                : "Messages"}
            </h3>
          </div>

        </div>


        {messages.length === 0 ? (
          <div className="messages-empty">

            <div className="messages-empty-icon">
              ✉
            </div>

            <h3>
              No messages yet.
            </h3>

            <p>
              Messages submitted from
              your portfolio will appear
              here.
            </p>

          </div>
        ) : (
          <div className="messages-list">

            {messages.map(
              (message) => (
                <article
                  className={`message-card ${
                    message.status ===
                    "unread"
                      ? "message-card-unread"
                      : ""
                  }`}
                  key={
                    message._id
                  }
                >

                  <div className="message-card-top">

                    <div>
                      <span className="message-status">
                        {message.status ===
                        "unread"
                          ? "UNREAD"
                          : "READ"}
                      </span>

                      <h3>
                        {message.name}
                      </h3>

                      <a
                        href={`mailto:${message.email}`}
                        className="message-email"
                      >
                        {message.email}
                      </a>
                    </div>

                    <time>
                      {new Date(
                        message.createdAt
                      ).toLocaleString()}
                    </time>

                  </div>


                  <p className="message-card-content">
                    {message.message}
                  </p>


                  <div className="message-card-footer">

                    <span
                      className={
                        message.emailSent
                          ? "email-sent"
                          : "email-not-sent"
                      }
                    >
                      {message.emailSent
                        ? "Email sent"
                        : "Email not sent"}
                    </span>


                    <div className="message-card-actions">

                      <button
                        type="button"
                        onClick={() =>
                          handleStatus(
                            message._id
                          )
                        }
                      >
                        {message.status ===
                        "unread"
                          ? "Mark Read"
                          : "Mark Unread"}
                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            message
                          )
                        }
                      >
                        Edit
                      </button>


                      <button
                        type="button"
                        className="message-delete-button"
                        onClick={() =>
                          handleDelete(
                            message._id
                          )
                        }
                        disabled={
                          deletingId ===
                          message._id
                        }
                      >
                        {deletingId ===
                        message._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

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

export default MessagesManager;
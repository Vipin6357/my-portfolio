import { useEffect, useRef, useState } from "react";
import "./Contact.css";
import { contactScrollAnimation } from "../../animations/contactAnimation";
import { sendContactMessage } from "../../services/contactService";

const contactData = {
  email: "vipingangwar264@gmail.com",

  location: "Bareilly, Uttar Pradesh, India",

  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/Vipin6357",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vipin-gangwar-29a5ab2a1/",
    },
  ],
};

function Contact() {
  const contactRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const [sending, setSending] = useState(false);

  useEffect(() => {
    const cleanup = contactScrollAnimation(
      contactRef.current
    );

    return cleanup;
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      setSending(true);
      setStatus("");

      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setStatus(
        "Your message has been sent successfully. I’ll get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setStatus(
        error.message ||
          "Failed to send your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section"
      ref={contactRef}
    >
      <div className="contact-container">

        

        <div className="contact-heading">
          <p>CONTACT</p>

          <h2>
            Let&apos;s work
            <span> together.</span>
          </h2>

          <p className="contact-intro">
            Have a project, opportunity or idea in mind?
            Feel free to reach out. I&apos;d be happy to
            connect and discuss how we can work together.
          </p>
        </div>


        <div className="contact-content">

        

          <div className="contact-info">

            <div className="contact-info-item">
              <span className="contact-label">
                Email
              </span>

              <a
                href={`mailto:${contactData.email}`}
                className="contact-value"
              >
                {contactData.email}
              </a>
            </div>


            <div className="contact-info-item">
              <span className="contact-label">
                Location
              </span>

              <span className="contact-value">
                {contactData.location}
              </span>
            </div>


            <div className="contact-socials">
              <span className="contact-label">
                Connect
              </span>

              <div className="contact-social-links">
                {contactData.socialLinks.map(
                  (social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.name}
                    </a>
                  )
                )}
              </div>
            </div>

          </div>


         

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="contact-field">
              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={sending}
              />
            </div>


            <div className="contact-field">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={sending}
              />
            </div>


            <div className="contact-field">
              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
                disabled={sending}
              />
            </div>


            <button
              type="submit"
              className="contact-submit"
              disabled={sending}
            >
              {sending
                ? "Sending..."
                : "Send Message"}
            </button>


            {status && (
              <p className="contact-status">
                {status}
              </p>
            )}

          </form>

        </div>


     

        <div className="contact-footer">
        </div>

      </div>
    </section>
  );
}

export default Contact;
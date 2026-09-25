import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await loginAdmin(
        formData.email,
        formData.password
      );

      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <a href="/" className="admin-login-logo">
          V<span>I</span>P<span>I</span>N <span>G</span>A<span>N</span>G<span>W</span>A<span>R</span>
        </a>

        <div className="admin-login-header">
          <p className="admin-login-label">
            ADMIN PANEL
          </p>

          <h1>Welcome back</h1>

          <p>
            Sign in to manage your portfolio.
          </p>
        </div>

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >
          <div className="admin-form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <a
          href="/"
          className="admin-back-link"
        >
          ← Back to portfolio
        </a>

      </div>
    </main>
  );
}

export default Login;
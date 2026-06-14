import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/pages/_login.scss";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="branding">
          <h1>MAVeRT</h1>
          <p>Motion Adherence &amp; Virtual Rehabilitation Tracking System</p>
          <span>Secure Clinical Monitoring Platform</span>
        </div>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-card">
          <h2>Admin Login</h2>
          <p className="subtitle">Sign in to access patient insights</p>

          {error && <p className="auth-error">{error}</p>}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="mavert@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </button>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle2, Sparkles } from "lucide-react";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register({ name, email, password, role });
      navigate("/dashboard");
    } catch (err) {
      const details = err?.response?.data?.details;
      setError(
        Array.isArray(details) && details.length
          ? details.map((d) => d.message).join(", ")
          : err?.response?.data?.error || "Registration failed",
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className="auth-page">
      <div className="auth-layout">
        <div className="auth-visual">
          <div className="brand-mark">
            <Sparkles size={18} />
          </div>
          <h1>Build your learning network.</h1>
          <p>
            Create an account as a learner, or share your expertise as a mentor.
          </p>
          <div className="auth-points">
            <div className="auth-point">
              <CheckCircle2 size={17} /> Personal dashboard
            </div>
            <div className="auth-point">
              <CheckCircle2 size={17} /> Booking and notifications
            </div>
            <div className="auth-point">
              <CheckCircle2 size={17} /> Skills and availability management
            </div>
          </div>
        </div>
        <div className="auth-form">
          <h2>Create your account</h2>
          <p>It only takes a minute to get started.</p>
          {error && (
            <div className="form-error" style={{ marginBottom: 14 }}>
              {error}
            </div>
          )}
          <form onSubmit={submit} className="form-stack">
            <div className="form-group">
              <label>Full name</label>
              <input
                className="field"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="field"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="field"
                type="password"
                value={password}
                minLength={6}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>
            <div className="form-group">
              <label>Account type</label>
              <select
                className="field"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">Learner</option>
                <option value="admin">Mentor / Admin</option>
              </select>
            </div>
            <button className="btn-primary" disabled={submitting}>
              {submitting ? "Creating..." : "Create account"}
            </button>
          </form>
          <div className="form-note">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;

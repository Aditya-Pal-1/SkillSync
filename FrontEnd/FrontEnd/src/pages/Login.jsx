import { useState } from "react";
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { CheckCircle2, Sparkles } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || "/dashboard";
  if (user) return <Navigate to={from} replace />;
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ email, password });
      console.log({email,password});
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.error || "Invalid credentials");
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
          <h1>Learn something useful. Teach something valuable.</h1>
          <p>
            SkillSync connects learners and mentors around practical, bookable
            one-to-one sessions.
          </p>
          <div className="auth-points">
            <div className="auth-point">
              <CheckCircle2 size={17} /> Discover skills that match your goals
            </div>
            <div className="auth-point">
              <CheckCircle2 size={17} /> Book open mentor slots instantly
            </div>
            <div className="auth-point">
              <CheckCircle2 size={17} /> Track your learning journey
            </div>
          </div>
        </div>
        <div className="auth-form">
          <h2>Welcome back</h2>
          <p>Sign in to continue to your SkillSync workspace.</p>
          {error && (
            <div className="form-error" style={{ marginBottom: 14 }}>
              {error}
            </div>
          )}
          <form onSubmit={submit} className="form-stack">
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
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#667085",
                fontSize: 12,
              }}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />{" "}
              Remember me
            </label>
            <button className="btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="form-note">
            Don't have an account? <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;

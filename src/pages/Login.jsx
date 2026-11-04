import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import FormField from "../components/FormField.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { validateEmail } from "../utils/validators.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  // Message passed from Register / Forgot Password pages
  const notice = location.state?.message;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(form.email),
      password: form.password ? "" : "Password is required.",
    };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    const result = login(form);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see your tasks."
      footer={
        <>
          New to Doable? <Link to="/register">Create an account</Link>
        </>
      }
    >
      {notice && <div className="alert alert-success-soft">{notice}</div>}
      {formError && (
        <div className="alert alert-error-soft" role="alert">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormField
          label="Password"
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Your password"
          autoComplete="current-password"
        />
        <div className="auth-row">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <button type="submit" className="button button-primary button-block">
          Log in
        </button>
      </form>
    </AuthLayout>
  );
}

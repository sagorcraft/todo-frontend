import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import FormField from "../components/FormField.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  validateConfirm,
  validateEmail,
  validatePassword,
} from "../utils/validators.js";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: form.name.trim().length < 2 ? "Enter your full name." : "",
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirm: validateConfirm(form.password, form.confirm),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    const result = register(form);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      {formError && (
        <div className="alert alert-error-soft" role="alert">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Full name"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Jane Doe"
          autoComplete="name"
        />
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
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />
        <FormField
          label="Confirm password"
          id="confirm"
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          error={errors.confirm}
          placeholder="Repeat your password"
          autoComplete="new-password"
        />
        <button type="submit" className="button button-primary button-block">
          Register
        </button>
      </form>
    </AuthLayout>
  );
}

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

// Demo reset flow (no email is sent):
//   Step 1 - enter the email of a registered account
//   Step 2 - choose a new password
export default function ForgotPassword() {
  const { emailExists, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    setErrors({ email: emailError });
    if (emailError) return;

    if (!emailExists(email)) {
      setFormError("No account found with this email.");
      return;
    }
    setFormError("");
    setStep(2);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      password: validatePassword(passwords.password),
      confirm: validateConfirm(passwords.password, passwords.confirm),
    };
    setErrors(newErrors);
    if (newErrors.password || newErrors.confirm) return;

    const result = resetPassword(email, passwords.password);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate("/login", {
      replace: true,
      state: { message: "Password updated. Log in with your new password." },
    });
  };

  return (
    <AuthLayout
      title={step === 1 ? "Reset your password" : "Choose a new password"}
      subtitle={
        step === 1
          ? "Enter the email you registered with."
          : `Setting a new password for ${email.trim().toLowerCase()}.`
      }
      footer={<Link to="/login">Back to login</Link>}
    >
      {formError && (
        <div className="alert alert-error-soft" role="alert">
          {formError}
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleEmailSubmit} noValidate>
          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({});
              setFormError("");
            }}
            error={errors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <button type="submit" className="button button-primary button-block">
            Reset password
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit} noValidate>
          <FormField
            label="New password"
            id="password"
            name="password"
            type="password"
            value={passwords.password}
            onChange={handlePasswordChange}
            error={errors.password}
            placeholder="At least 6 characters"
            autoComplete="new-password"
          />
          <FormField
            label="Confirm new password"
            id="confirm"
            name="confirm"
            type="password"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            error={errors.confirm}
            placeholder="Repeat the new password"
            autoComplete="new-password"
          />
          <button type="submit" className="button button-primary button-block">
            Save new password
          </button>
          <button
            type="button"
            className="button button-outline button-block mt-2"
            onClick={() => {
              setStep(1);
              setErrors({});
              setFormError("");
            }}
          >
            Use a different email
          </button>
        </form>
      )}
    </AuthLayout>
  );
}

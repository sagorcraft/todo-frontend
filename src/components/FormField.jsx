import { useState } from "react";
import Icon from "./Icon.jsx";

// A labelled input with an error message.
// Password fields get a show/hide button automatically.
export default function FormField({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  disabled = false,
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && visible ? "text" : type;

  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className={`field-control ${error ? "has-error" : ""}`}>
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {isPassword && (
          <button
            type="button"
            className="field-toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            <Icon name={visible ? "eyeOff" : "eye"} />
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

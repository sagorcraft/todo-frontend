export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validateEmail(value) {
  if (!value.trim()) return "Email is required.";
  if (!isValidEmail(value)) return "Enter a valid email address.";
  return "";
}

export function validatePassword(value) {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Use at least 6 characters.";
  return "";
}

export function validateConfirm(password, confirm) {
  if (!confirm) return "Confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return "";
}

export function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

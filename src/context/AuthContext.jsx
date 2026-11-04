import { createContext, useContext, useEffect, useState } from "react";
import { makeId, readJSON, writeJSON, removeKey } from "../utils/storage.js";

// DEMO ONLY: users and passwords are kept in LocalStorage in plain text.
// Never do this in a real application - use a backend with hashed passwords.
const USERS_KEY = "doable_users";
const SESSION_KEY = "doable_session";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readJSON(USERS_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => {
    const sessionId = readJSON(SESSION_KEY, null);
    if (!sessionId) return null;
    return readJSON(USERS_KEY, []).find((u) => u.id === sessionId) || null;
  });

  // Keep LocalStorage in sync with state
  useEffect(() => {
    writeJSON(USERS_KEY, users);
  }, [users]);

  const normalize = (email) => email.trim().toLowerCase();

  const register = ({ name, email, password }) => {
    const cleanEmail = normalize(email);
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser = {
      id: makeId(),
      name: name.trim(),
      email: cleanEmail,
      password,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    writeJSON(SESSION_KEY, newUser.id);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const user = users.find(
      (u) => u.email === normalize(email) && u.password === password
    );
    if (!user) return { ok: false, error: "Email or password is incorrect." };
    setCurrentUser(user);
    writeJSON(SESSION_KEY, user.id);
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
    removeKey(SESSION_KEY);
  };

  const emailExists = (email) => users.some((u) => u.email === normalize(email));

  const resetPassword = (email, newPassword) => {
    const cleanEmail = normalize(email);
    if (!users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: "No account found with this email." };
    }
    setUsers(
      users.map((u) =>
        u.email === cleanEmail ? { ...u, password: newPassword } : u
      )
    );
    return { ok: true };
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, register, login, logout, emailExists, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

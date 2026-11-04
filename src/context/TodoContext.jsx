import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { makeId, readJSON, writeJSON } from "../utils/storage.js";

const TODOS_KEY = "doable_todos";
const MAX_LENGTH = 200;

const TodoContext = createContext(null);

function checkText(text) {
  const clean = text.trim();
  if (!clean) return { error: "Write a task before saving." };
  if (clean.length > MAX_LENGTH) {
    return { error: `Keep tasks under ${MAX_LENGTH} characters.` };
  }
  return { clean };
}

export function TodoProvider({ children }) {
  const { currentUser } = useAuth();
  // Every user's tasks live in one array; each task has a userId.
  const [allTodos, setAllTodos] = useState(() => readJSON(TODOS_KEY, []));

  useEffect(() => {
    writeJSON(TODOS_KEY, allTodos);
  }, [allTodos]);

  // Only the logged-in user's tasks are exposed to the UI
  const todos = useMemo(
    () => (currentUser ? allTodos.filter((t) => t.userId === currentUser.id) : []),
    [allTodos, currentUser]
  );

  const addTodo = (text) => {
    const { clean, error } = checkText(text);
    if (error) return { ok: false, error };
    const todo = {
      id: makeId(),
      userId: currentUser.id,
      text: clean,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setAllTodos((prev) => [todo, ...prev]); // newest first
    return { ok: true };
  };

  const updateTodo = (id, text) => {
    const { clean, error } = checkText(text);
    if (error) return { ok: false, error };
    setAllTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: clean } : t)));
    return { ok: true };
  };

  const toggleTodo = (id) =>
    setAllTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const deleteTodo = (id) => setAllTodos((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () =>
    setAllTodos((prev) =>
      prev.filter((t) => !(t.userId === currentUser.id && t.completed))
    );

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used inside <TodoProvider>");
  return ctx;
}

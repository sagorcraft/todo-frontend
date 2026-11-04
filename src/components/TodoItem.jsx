import { useEffect, useRef, useState } from "react";
import { useTodos } from "../context/TodoContext.jsx";
import { formatDate } from "../utils/validators.js";
import Icon from "./Icon.jsx";

export default function TodoItem({ todo }) {
  const { updateTodo, toggleTodo, deleteTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Focus the input when edit mode opens
  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const startEdit = () => {
    setDraft(todo.text);
    setError("");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setError("");
  };

  const saveEdit = () => {
    const result = updateTodo(todo.id, draft);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${todo.text}"?`)) deleteTodo(todo.id);
  };

  return (
    <li className={`todo-item ${todo.completed ? "is-done" : ""}`}>
      <div className="todo-main">
        {editing ? (
          <>
            <div className={`field-control ${error ? "has-error" : ""}`}>
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                aria-label="Edit task"
              />
            </div>
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="todo-text">{todo.text}</p>
            <div className="todo-meta">
              <span className={`badge-status ${todo.completed ? "badge-done" : "badge-pending"}`}>
                {todo.completed ? "Completed" : "Pending"}
              </span>
              <span className="todo-date">Created {formatDate(todo.createdAt)}</span>
            </div>
          </>
        )}
      </div>

      <div className="todo-actions">
        {editing ? (
          <>
            <button type="button" className="button button-primary button-sm" onClick={saveEdit}>
              <Icon name="check" size={16} />
              <span>Save</span>
            </button>
            <button type="button" className="button button-outline button-sm" onClick={cancelEdit}>
              <Icon name="x" size={16} />
              <span>Cancel</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="button button-soft button-sm"
              onClick={() => toggleTodo(todo.id)}
            >
              <Icon name={todo.completed ? "undo" : "check"} size={16} />
              <span>{todo.completed ? "Mark pending" : "Complete"}</span>
            </button>
            <button type="button" className="button button-outline button-sm" onClick={startEdit}>
              <Icon name="edit" size={16} />
              <span>Edit</span>
            </button>
            <button type="button" className="button button-danger button-sm" onClick={handleDelete}>
              <Icon name="trash" size={16} />
              <span>Delete</span>
            </button>
          </>
        )}
      </div>
    </li>
  );
}

import { useRef, useState } from "react";
import { useTodos } from "../context/TodoContext.jsx";
import Icon from "./Icon.jsx";

export default function TodoForm() {
  const { addTodo } = useTodos();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addTodo(text);
    if (!result.ok) {
      setError(result.error);
      inputRef.current?.focus();
      return;
    }
    setText("");
    setError("");
    inputRef.current?.focus();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <div className="todo-form-row">
        <div className={`field-control grow ${error ? "has-error" : ""}`}>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            placeholder="What needs to get done?"
            aria-label="New task"
            aria-invalid={Boolean(error)}
          />
        </div>
        <button type="submit" className="button button-primary">
          <Icon name="plus" />
          <span>Add task</span>
        </button>
      </div>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

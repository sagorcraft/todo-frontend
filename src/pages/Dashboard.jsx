import { useAuth } from "../context/AuthContext.jsx";
import { useTodos } from "../context/TodoContext.jsx";
import StatCard from "../components/StatCard.jsx";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import Icon from "../components/Icon.jsx";

const COPY = {
  all: {
    title: "All tasks",
    empty: "No tasks yet. Add your first task above to get started.",
  },
  pending: {
    title: "Pending tasks",
    empty: "Nothing pending. You're all caught up.",
  },
  completed: {
    title: "Completed tasks",
    empty: "No completed tasks yet. Finish a task and it will show up here.",
  },
};

export default function Dashboard({ filter = "all" }) {
  const { currentUser } = useAuth();
  const { todos, clearCompleted } = useTodos();

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const visible = todos.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const firstName = currentUser.name.trim().split(" ")[0];
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleClearCompleted = () => {
    if (window.confirm(`Delete ${completed} completed task(s)?`)) clearCompleted();
  };

  return (
    <>
      <div className="page-head">
        <h1>Hello, {firstName}</h1>
        <p>{today}</p>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <StatCard label="Total tasks" value={total} icon="list" tone="total" />
        </div>
        <div className="col-6 col-md-4">
          <StatCard label="Completed" value={completed} icon="checkCircle" tone="done" />
        </div>
        <div className="col-6 col-md-4">
          <StatCard label="Pending" value={pending} icon="clock" tone="pending" />
        </div>
      </div>

      <section className="panel progress-panel" aria-label="Progress">
        <div className="progress-text">
          <span>Progress</span>
          <strong>{percent}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </section>

      <section className="panel">
        <TodoForm />
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>{COPY[filter].title}</h2>
          {completed > 0 && (
            <button type="button" className="button button-outline button-sm" onClick={handleClearCompleted}>
              <Icon name="broom" size={16} />
              <span>Clear completed</span>
            </button>
          )}
        </div>
        <TodoList todos={visible} emptyMessage={COPY[filter].empty} />
      </section>
    </>
  );
}

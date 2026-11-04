import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { useTodos } from "../context/TodoContext.jsx";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { todos } = useTodos();

  const completed = todos.filter((t) => t.completed).length;
  const counts = { total: todos.length, completed, pending: todos.length - completed };

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} counts={counts} />
      <div className="app-body">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

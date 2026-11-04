import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";
import Icon from "./Icon.jsx";

export default function Sidebar({ open, onClose, counts }) {
  const links = [
    { to: "/dashboard", label: "All tasks", icon: "list", count: counts.total, end: true },
    { to: "/dashboard/pending", label: "Pending", icon: "clock", count: counts.pending },
    { to: "/dashboard/completed", label: "Completed", icon: "checkCircle", count: counts.completed },
  ];

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Main navigation">
        <div className="sidebar-head">
          <Logo light />
          <button
            type="button"
            className="icon-button sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            >
              <Icon name={link.icon} />
              <span className="sidebar-label">{link.label}</span>
              <span className="sidebar-count">{link.count}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

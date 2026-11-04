import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "./Icon.jsx";

export default function Navbar({ onMenuClick }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const initial = currentUser.name.trim().charAt(0).toUpperCase();

  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-button menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Icon name="menu" size={22} />
      </button>

      <div className="topbar-right">
        <div className="user-chip">
          <span className="avatar" aria-hidden="true">
            {initial}
          </span>
          <span className="user-name">{currentUser.name}</span>
        </div>
        <button type="button" className="button button-outline" onClick={handleLogout}>
          <Icon name="logout" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

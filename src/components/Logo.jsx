import Icon from "./Icon.jsx";

export default function Logo({ light = false }) {
  return (
    <div className={`logo ${light ? "logo-light" : ""}`}>
      <span className="logo-mark">
        <Icon name="check" size={16} />
      </span>
      <span className="logo-text">Doable</span>
    </div>
  );
}

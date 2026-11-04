import Icon from "./Icon.jsx";

export default function StatCard({ label, value, icon, tone }) {
  return (
    <div className={`stat-card stat-${tone}`}>
      <span className="stat-icon">
        <Icon name={icon} size={22} />
      </span>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}

import Logo from "./Logo.jsx";
import Icon from "./Icon.jsx";

// Shared shell for Login, Register and Forgot Password.
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <Logo light />
        <div>
          <h2 className="auth-headline">One list. Everything you need to finish.</h2>
          <ul className="auth-sample" aria-hidden="true">
            <li className="done">
              <Icon name="checkCircle" /> Book dentist appointment
            </li>
            <li className="done">
              <Icon name="checkCircle" /> Send invoice to client
            </li>
            <li>
              <Icon name="clock" /> Plan next week's groceries
            </li>
          </ul>
        </div>
        <p className="auth-note">Your tasks stay private to your account.</p>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-mobile-logo">
            <Logo />
          </div>
          <h1 className="auth-title">{title}</h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          {children}
          {footer && <div className="auth-footer">{footer}</div>}
        </div>
      </main>
    </div>
  );
}

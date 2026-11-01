import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">🕊️</span>
          <span className="brand-text">
            VEDI <span className="brand-sub">Foundation</span>
          </span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/programs">Programs</NavLink>
          <NavLink to="/roadmap">Roadmap</NavLink>
          <NavLink to="/get-involved" className="nav-cta">
            Get Involved
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

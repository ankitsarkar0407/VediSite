import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function Layout() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <p className="footer-brand">VEDI Foundation 🕊️</p>
            <p className="muted">
              “Where Every Girl Child Finds Her Wings.”
            </p>
          </div>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/programs">Programs</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/get-involved">Get Involved</Link>
            <Link to="/admin" className="muted">
              Admin
            </Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <p className="muted">
            &copy; {new Date().getFullYear()} VEDI Foundation. Educate Her.
            Empower Her. Elevate Society.
          </p>
        </div>
      </footer>
    </div>
  );
}

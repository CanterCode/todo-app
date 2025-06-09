import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/NavBar.css";

const Navbar: React.FC = () => {
  const { user } = useUser();
  const { logout } = useAuth0();

  return (
    <nav className="custom-navbar shadow-sm py-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Left side - Nav Links */}
        <ul className="nav-links d-flex mb-0">
          <li className="nav-item">
            <NavLink className="nav-link me-3" to="/">Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/CanterCode/todo-app"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>

        {/* Center - Brand */}
        <Link className="navbar-brand center-brand " to="/">
          Cander
        </Link>

        {/* Right side - User Info */}
        {user && (
          <div className="user-info d-flex align-items-center">
            {user.picture && (
              <img
                src={user.picture}
                alt="User"
                className="rounded-circle me-2"
                width="32"
                height="32"
              />
            )}
            <span className="text-white me-3">Hi, {user.firstName}</span>
            <button
              className="btn btn-logout"
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin + "/login",
                  },
                })
              }
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
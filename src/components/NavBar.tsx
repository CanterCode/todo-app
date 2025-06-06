import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar: React.FC = () => {
  const { user } = useUser();
  const { logout } = useAuth0();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Cander</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">Create Task</NavLink>
            </li>
          </ul>

          {user && (
            <div className="d-flex align-items-center text-white">
              <img
                src={user.picture}
                alt="User"
                className="rounded-circle me-2"
                width="32"
                height="32"
              />
              <span className="me-3">Hello, {user.firstName}!</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin + '/login' },
                  })
                }
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
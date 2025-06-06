import React from "react";
import { useUser } from "../context/UserContext";

const Footer: React.FC = () => {
  const { user } = useUser();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-center text-muted py-2 mt-auto border-top">
      <div className="container px-3">
        <small className="d-block">
          © {currentYear} Candor. All rights reserved.
        </small>
        {user && (
          <small className="d-block">
            Currently logged in as <strong>{user.fullName}</strong> ({user.email})
          </small>
        )}
      </div>
    </footer>
  );
};

export default Footer;

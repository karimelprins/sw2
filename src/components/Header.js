import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const location = useLocation();
  const isLoggedIn =
    localStorage.getItem("patientID") || localStorage.getItem("adminID");
  const userRole = localStorage.getItem("patientID") ? "Patient" : "Admin";

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">ICU System</Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/patient/register"
                  className={
                    location.pathname === "/patient/register" ? "active" : ""
                  }
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to={
                    userRole === "Admin"
                      ? "/admin/dashboard"
                      : "/patient/dashboard"
                  }
                  className={
                    location.pathname === "/admin/dashboard" ||
                    location.pathname === "/patient/dashboard"
                      ? "active"
                      : ""
                  }
                >
                  {userRole} Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="logout-btn"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to the ICU Management System</h1>
          <p>
            Manage ICUs, search for nearby facilities, and ensure the best care
            for patients. Your health, our priority.
          </p>
          <div className="buttons">
            <Link to="/login" className="btn primary-btn">
              Login
            </Link>
            <Link to="/patient/register" className="btn secondary-btn">
              Register as Patient
            </Link>
          </div>
        </div>
      </header>
      <section className="about">
        <h2>About Our System</h2>
        <p>
          Our ICU Management System streamlines healthcare by helping patients
          find nearby ICU facilities in real-time and enabling hospital
          administrators to efficiently manage ICU resources.
        </p>
      </section>
      <footer className="footer">
        <p>&copy; 2024 ICU Management System. @SWE,LEVEL 3.</p>
      </footer>
    </div>
  );
};

export default HomePage;

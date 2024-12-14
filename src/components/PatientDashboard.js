import React from "react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Patient Dashboard</h2>
      <Link to="/patient/search">Search Hospitals</Link>
    </div>
  );
};

export default PatientDashboard;

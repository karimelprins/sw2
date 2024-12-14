import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <Link to="/admin/hospitals">Manage Hospitals</Link>
    </div>
  );
};

export default AdminDashboard;

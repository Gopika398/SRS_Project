import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>HR Task Management</h2>

      <div>
        {role && <Link to="/tasks">Tasks</Link>}
        {role === "admin" && <Link to="/admin">Admin</Link>}
        {role === "employee" && <Link to="/employee">Employee</Link>}
        {role && <button onClick={logout}>Logout</button>}
      </div>
    </div>
  );
}

export default Navbar;

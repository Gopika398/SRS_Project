import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("role", role);

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  return (
    <div className="login-container">
      <h2>HR Task Management Login</h2>

      <form onSubmit={handleLogin} className="login-form">
        <label>Select Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">HR Admin</option>
          <option value="employee">Employee</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

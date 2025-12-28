import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const link = (to, label) => (
    <button
      onClick={() => navigate(to)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        pathname === to
          ? "bg-[#5b47db] text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5b47db] to-[#7c3aed] flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white tracking-tight">
                HR
              </div>
              <div className="text-xs text-gray-300">Management System</div>
            </div>
          </button>
          <div className="flex items-center gap-2">
            {link("/dashboard", "Dashboard")}
            {link("/employees", "Employees")}
            {link("/tasks", "Tasks")}
            {link("/reports", "Reports")}
          </div>
          <button
            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors shadow-md"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

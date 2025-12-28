import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EmployeeProvider } from "./contexts/EmployeeContext";
import { TaskProvider } from "./contexts/TaskContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Employees = lazy(() => import("./pages/Employees"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Reports = lazy(() => import("./pages/Reports"));

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#e8eaf6]">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5b47db]"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

const Protected = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <TaskProvider>
          <Router>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <Protected>
                      <Dashboard />
                    </Protected>
                  }
                />
                <Route
                  path="/employees"
                  element={
                    <Protected>
                      <Employees />
                    </Protected>
                  }
                />
                <Route
                  path="/tasks"
                  element={
                    <Protected>
                      <Tasks />
                    </Protected>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <Protected>
                      <Reports />
                    </Protected>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </Router>
        </TaskProvider>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;

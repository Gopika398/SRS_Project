import { useNavigate } from "react-router-dom";
import { useEmployees } from "../contexts/EmployeeContext";
import { useTasks } from "../contexts/TaskContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { employees } = useEmployees();
  const { tasks } = useTasks();

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      borderColor: "border-blue-500",
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      borderColor: "border-green-500",
    },
    {
      title: "Completed",
      value: tasks.filter((t) => t.status === "Completed").length,
      borderColor: "border-teal-500",
    },
    {
      title: "In Progress",
      value: tasks.filter((t) => t.status === "InProgress").length,
      borderColor: "border-red-500",
    },
  ];

  const quickActions = [
    { label: "Add Employee", path: "/employees", color: "[#5b47db]" },
    { label: "Create Task", path: "/tasks", color: "[#10b981]" },
    { label: "View Reports", path: "/reports", color: "[#f59e0b]" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your team today
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="card hover:shadow-lg transition-shadow">
            <div className="text-sm font-medium text-gray-600 mb-2">
              {stat.title}
            </div>
            <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-[#5b47db]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.path)}
              className="group relative overflow-hidden rounded-xl p-6 text-left transition-all hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: action.color.replace("[", "").replace("]", ""),
              }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-white font-semibold text-lg mb-1">
                  {action.label}
                </div>
                <div className="text-white/80 text-sm">Click to navigate</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Tasks
            </h2>
            <button
              onClick={() => navigate("/tasks")}
              className="text-sm text-sky-600 hover:text-sky-700 font-medium"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{task.title}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {task.assignee} • {task.dueDate}
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "InProgress"
                      ? "bg-blue-100 text-blue-700"
                      : task.status === "Blocked"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <div>No tasks yet. Create your first task!</div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Team Overview
            </h2>
            <button
              onClick={() => navigate("/employees")}
              className="text-sm text-sky-600 hover:text-sky-700 font-medium"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {employees.slice(0, 5).map((emp) => (
              <div
                key={emp.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#5b47db] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {emp.name?.charAt(0) || "E"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {emp.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {emp.role} • {emp.department}
                  </div>
                </div>
              </div>
            ))}
            {employees.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <div>No employees yet. Add your first team member!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

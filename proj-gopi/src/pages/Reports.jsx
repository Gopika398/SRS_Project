import { useEmployees } from "../contexts/EmployeeContext";
import { useTasks } from "../contexts/TaskContext";

const Reports = () => {
  const { employees } = useEmployees();
  const { tasks } = useTasks();

  const getTaskCount = (status) =>
    tasks.filter((t) => t.status === status).length;
  const completionRate =
    tasks.length > 0
      ? ((getTaskCount("Completed") / tasks.length) * 100).toFixed(1)
      : 0;

  const stats = [
    { title: "Total Employees", value: employees.length },
    { title: "Total Tasks", value: tasks.length },
    { title: "Completed", value: getTaskCount("Completed") },
    { title: "Pending", value: getTaskCount("Pending") },
    { title: "In Progress", value: getTaskCount("InProgress") },
    { title: "Blocked", value: getTaskCount("Blocked") },
  ];

  const employeeTaskCount = employees.map((e) => ({
    ...e,
    taskCount: tasks.filter((t) => t.assignee === e.name).length,
    completedCount: tasks.filter(
      (t) => t.assignee === e.name && t.status === "Completed"
    ).length,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 mt-1">
          Comprehensive overview of team performance and task metrics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="card p-4 hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mt-1">
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Task Completion Rate
        </h2>
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(completionRate / 100) * 351.86} 351.86`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {completionRate}%
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Completed</div>
                <div className="text-2xl font-semibold text-green-600">
                  {completedTasks}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Remaining</div>
                <div className="text-2xl font-semibold text-blue-600">
                  {totalTasks - completedTasks}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Employee Task Distribution
          </h2>
          <div className="text-sm text-gray-500">Total: {totalTasks} tasks</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Assigned Tasks
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeTaskCount.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-12 text-center text-gray-500"
                    colSpan={6}
                  >
                    <div className="font-medium">No data available</div>
                    <div className="text-sm mt-1">
                      Add employees and tasks to see reports
                    </div>
                  </td>
                </tr>
              ) : (
                employeeTaskCount.map((row) => {
                  const progress =
                    row.taskCount > 0
                      ? ((row.completedCount / row.taskCount) * 100).toFixed(0)
                      : 0;
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#5b47db] text-white flex items-center justify-center font-semibold flex-shrink-0">
                            {row.name?.charAt(0) || "E"}
                          </div>
                          <span className="font-medium text-gray-900">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {row.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {row.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">
                          {row.taskCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-green-600">
                          {row.completedCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                            <div
                              className="bg-gradient-to-r from-sky-500 to-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
                            {progress}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;

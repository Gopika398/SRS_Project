import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useEmployees } from "../contexts/EmployeeContext";

const statusColors = {
  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  InProgress: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  Completed: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
  },
  Blocked: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
};

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { employees } = useEmployees();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const initialState = {
    id: null,
    title: "",
    assignee: "",
    dueDate: "",
    status: "Pending",
  };
  const [currentTask, setCurrentTask] = useState(initialState);

  const handleOpen = () => {
    setEditMode(false);
    setCurrentTask(initialState);
    setOpen(true);
  };

  const handleEdit = (task) => {
    setEditMode(true);
    setCurrentTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask(initialState);
  };

  const handleSubmit = () => {
    const { title, assignee, dueDate } = currentTask;
    if (!title || !assignee || !dueDate)
      return alert("Please fill in all fields");
    editMode ? updateTask(currentTask) : addTask(currentTask);
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      deleteTask(id);
    }
  };

  const filteredTasks = tasks
    .filter((t) => (filter === "All" ? true : t.status === filter))
    .filter((t) =>
      `${t.title} ${t.assignee} ${t.status}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sessions</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all your team's tasks
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpen}>
          Add Task
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            className="input flex-1"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="input sm:w-48"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>InProgress</option>
            <option>Completed</option>
            <option>Blocked</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-12 text-center text-gray-500"
                    colSpan={5}
                  >
                    <div className="font-medium">No tasks found</div>
                    <div className="text-sm mt-1">
                      {search || filter !== "All"
                        ? "Try adjusting your filters"
                        : "Add your first task to get started"}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{t.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {t.assignee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {t.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[t.status]?.bg || "bg-gray-100"
                        } ${statusColors[t.status]?.text || "text-gray-700"}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button
                          className="px-4 py-2 bg-[#5b47db] text-white text-sm font-medium rounded-lg hover:bg-[#4a38ca] transition-all shadow-sm hover:shadow-md"
                          onClick={() => handleEdit(t)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all shadow-sm hover:shadow-md"
                          onClick={() => handleDelete(t.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editMode ? "Edit Task" : "Create New Task"}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  className="input"
                  placeholder="Enter task title"
                  value={currentTask.title}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign to Employee
                </label>
                <select
                  className="input"
                  value={currentTask.assignee}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, assignee: e.target.value })
                  }
                >
                  <option value="">Select an employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.name}>
                      {emp.name} - {emp.role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  className="input"
                  type="date"
                  value={currentTask.dueDate}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, dueDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="input"
                  value={currentTask.status}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, status: e.target.value })
                  }
                >
                  <option>Pending</option>
                  <option>InProgress</option>
                  <option>Completed</option>
                  <option>Blocked</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button className="btn btn-outline" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                {editMode ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;

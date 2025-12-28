import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function AdminDashboard() {
  const { tasks, addTask, updateStatus } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [employee, setEmployee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask({
      id: Date.now(),
      title,
      employee,
      status: "Pending"
    });

    setTitle("");
    setEmployee("");
  };

  return (
    <div className="container">
      <h1>HR Dashboard</h1>

      {/* Assign Task */}
      <form className="task-form" onSubmit={handleSubmit}>
        <h3>Assign New Task</h3>
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          required
        />
        <button type="submit">Assign</button>
      </form>

      {/* Manage Status */}
      <h3 style={{ marginTop: "30px" }}>Manage Tasks</h3>

      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>Employee: {task.employee}</p>

          <select
            value={task.status}
            onChange={(e) => updateStatus(task.id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;

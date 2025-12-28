import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function EmployeeDashboard() {
  const { tasks, updateStatus } = useContext(TaskContext);

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>

      {tasks.length === 0 && <p>No tasks assigned.</p>}

      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>Status: {task.status}</p>

          {task.status === "Pending" && (
            <button
              className="complete-btn"
              onClick={() => updateStatus(task.id, "Completed")}
            >
              Mark as Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default EmployeeDashboard;

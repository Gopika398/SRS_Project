import React from "react";

function TaskCard({ task }) {
  return (
    <div className={`task-card ${task.status.toLowerCase()}`}>
      <h3>{task.title}</h3>
      <p>Assigned to: {task.employee}</p>
      <p>Status: <strong>{task.status}</strong></p>
    </div>
  );
}

export default TaskCard;

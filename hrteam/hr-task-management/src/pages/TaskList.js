import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function TaskList() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="container">
      <h1>Task List</h1>

      {tasks.length === 0 && <p>No tasks assigned yet.</p>}

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;

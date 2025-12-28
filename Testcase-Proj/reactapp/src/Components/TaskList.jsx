import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TaskContext from "../context/TaskContext";

const TaskList = () => {
 const { state } = useContext(TaskContext);

 return (
  <div>
   <h2>Task List</h2>
   {state.tasks.map(task => (
    <div key={task.id} className="card">
     <h3>{task.title}</h3>
     <p>Employee: {task.employee}</p>
     <p>Status: {task.status}</p>
     <p>Due Date: {task.due}</p>
     <Link to={`/task/${task.id}`}>View Details</Link>
    </div>
   ))}
  </div>
 );
};

export default TaskList;


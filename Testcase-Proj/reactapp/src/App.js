import React, { useState } from 'react';

function App() {
  const [view, setView] = useState('list');
  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTask] = useState([
    { id: 1, name: 'Task One', description: 'First task', status: 'pending' },
    { id: 2, name: 'Task Two', description: 'Second task', status: 'completed' },
  ]);

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
  });

  const openDetails = (task) => {
    setSelectedTask(task);
    setView('details');
  };

  const updateStatus = (status) => {
    setSelectedTask({ ...selectedTask, status });
  };

  return (
    <div>
      <h1>Task Management</h1>

      <button onClick={() => setView('add')}>Add Task</button>
      <button onClick={() => setView('list')}>Task List</button>

      {view === 'list' && (
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <span>
                {task.name} - {task.status}
              </span>
              <button onClick={() => openDetails(task)}>View Details</button>
            </div>
          ))}
        </div>
      )}

      {view === 'add' && (
        <div>
          <input
            placeholder="Task Name"
            value={newTask.name}
            onChange={(e) =>
              setNewTask({ ...newTask, name: e.target.value })
            }
          />
          <input
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
        </div>
      )}

      {view === 'details' && selectedTask && (
        <div>
          <h2>Task Details</h2>
          <p>Name: {selectedTask.name}</p>

          <button onClick={() => updateStatus('pending')}>Pending</button>
          <button onClick={() => updateStatus('in progress')}>
            In Progress
          </button>
          <button onClick={() => updateStatus('completed')}>
            Completed
          </button>

          <p>Current: {selectedTask.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;

import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Implement login module",
      assignee: "Gopika",
      dueDate: "2025-01-15",
      status: "InProgress",
    },
    {
      id: 2,
      title: "Design dashboard UI",
      assignee: "Kichu",
      dueDate: "2025-01-18",
      status: "Pending",
    },
    {
      id: 3,
      title: "Perform regression testing",
      assignee: "Suvetha",
      dueDate: "2025-01-20",
      status: "Pending",
    },
    {
      id: 4,
      title: "Review project milestones",
      assignee: "Kishore",
      dueDate: "2025-01-14",
      status: "Completed",
    },
    {
      id: 5,
      title: "Organize onboarding session",
      assignee: "Pooja",
      dueDate: "2025-01-22",
      status: "Blocked",
    },
    {
      id: 6,
      title: "Prepare social media campaign plan",
      assignee: "Dhanya",
      dueDate: "2025-01-25",
      status: "InProgress",
    },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTaskStatus = (id, status) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const getTasksByEmployee = (employeeId) => {
    return tasks.filter((task) => task.assignedEmployee === employeeId);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTasksByEmployee,
    getTasksByStatus,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

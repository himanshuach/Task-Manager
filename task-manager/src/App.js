import React, { useState } from "react";
import "./App.css"; // Add your styles here

function App() {
  // State for tasks and search term
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to add a new task
  const onAddTask = (taskTitle, priority = "Medium") => {
    if (taskTitle.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
        priority,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  // Function to toggle task completion
  const onToggleCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to sort tasks
  const onSortTasks = (criterion) => {
    const sortedTasks = [...tasks];
    if (criterion === "priority") {
      sortedTasks.sort((a, b) => a.priority.localeCompare(b.priority));
    } else if (criterion === "title") {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criterion === "completion") {
      sortedTasks.sort((a, b) => a.completed - b.completed);
    }
    setTasks(sortedTasks);
  };

  // Filtered tasks based on search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Task Manager</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Task Component */}
      <AddTaskComponent onAddTask={onAddTask} />

      {/* Sorting Options */}
      <select onChange={(e) => onSortTasks(e.target.value)}>
        <option value="title">Sort by Title</option>
        <option value="priority">Sort by Priority</option>
        <option value="completion">Sort by Completion</option>
      </select>

      {/* Task List Component */}
      <TaskListComponent tasks={filteredTasks} onToggleCompletion={onToggleCompletion} />
    </div>
  );
}

// Component to add a task
function AddTaskComponent({ onAddTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAddTask = () => {
    onAddTask(taskTitle, priority);
    setTaskTitle(""); // Clear input field
  };

  return (
    <div className="add-task">
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

// Component to display the task list
function TaskListComponent({ tasks, onToggleCompletion }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.priority === "High" ? "red" : task.priority === "Low" ? "green" : "black",
          }}
          onClick={() => onToggleCompletion(task.id)}
        >
          {task.title} - {task.priority}
        </li>
      ))}
    </ul>
  );
}

export default App;
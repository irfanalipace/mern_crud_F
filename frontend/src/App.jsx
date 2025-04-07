// frontend/src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./auth/Login";
import Register from "./auth/Register";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post("http://localhost:5000/api/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const updateTask = async (id, completed) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      completed: !completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!user) {
    return (
      <div>
        <Register onRegister={setUser} />
        <hr />
        <Login onLogin={setUser} />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <h2>Task Manager</h2>
      <input
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              onClick={() => updateTask(task._id, task.completed)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
    </div>
  );
};

export default App;

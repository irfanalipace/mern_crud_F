// frontend/src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./auth/Login";
import Register from "./auth/Register";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
      <Box>
        <Register onRegister={setUser} />
        <hr />
        <Login onLogin={setUser} />
      </Box>
    );
  }
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
    <Card elevation={6} sx={{width:"400px"}}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          Task Manager
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={addTask}>
            Add
          </Button>
        </Box>

        <List>
          {tasks.map((task) => (
            <React.Fragment key={task._id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => deleteTask(task._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={task.title}
                  onClick={() => updateTask(task._id, task.completed)}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                />
                <IconButton
                  onClick={() => updateTask(task._id, task.completed)}
                  color={task.completed ? "success" : "default"}
                >
                  <CheckCircleOutlineIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Welcome, {user.name}</Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Container>
  );
};

export default App;

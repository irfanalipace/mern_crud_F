import { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      alert(err.response.data.msg || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        p: 2,
      }}
    >
      <Card sx={{ width: 400, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2" align="center" mt={2}>
            Don't have an account?{" "}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;

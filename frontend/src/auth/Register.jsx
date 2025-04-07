import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
function Register({ onRegister }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      onRegister(res.data.user);
    } catch (err) {
      alert(err.response.data.msg || 'Registration failed');
    }
  };

  return (
    <Box
    sx={{
      minHeight: '100vh',
      bgcolor: 'linear-gradient(to right, #fdfbfb, #ebedee)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 2,
    }}
  >
    <Card sx={{ width: 400, borderRadius: 4, boxShadow: 6 }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
          >
            Register
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </CardContent>
    </Card>
  </Box>
  );
}

export default Register;

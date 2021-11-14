import {
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Button,
  Link,
  Checkbox,
} from '@mui/material';
import { titleActions, useTitleDispatch } from 'context/title';
import { useUser, useUserDispatch, userActions } from 'context/user';
import { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { login } from 'api/user';

function Login() {
  const titleDispatch = useTitleDispatch();

  const userDispatch = useUserDispatch();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Register',
      documentTitle: 'Register',
    });
  }, [titleDispatch]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await login({ email: form.email, password: form.password });

    userActions.setUserData(userDispatch, {
      token: data.token,
      name: data.name,
    });
  }

  function handleFormChange(key, value) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={form.email}
              onChange={(e) => {
                handleFormChange('email', e.target.value);
              }}
              autoComplete="email"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => {
                handleFormChange('password', e.target.value);
              }}
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/register">
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Login;

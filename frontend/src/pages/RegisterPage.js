import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { titleActions, useTitleDispatch } from 'context/title';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

function RegisterPage() {
  const titleDispatch = useTitleDispatch();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Register',
      documentTitle: 'Register',
    });
  }, [titleDispatch]);

  function handleSubmit() {}

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
        Register
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              value={form.name}
              onChange={(e) => {
                handleFormChange('name', e.target.value);
              }}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => {
                handleFormChange('email', e.target.value);
              }}
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
          Register
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default RegisterPage;

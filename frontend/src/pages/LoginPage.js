import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Grid, Link, TextField, Typography } from '@mui/material';
import { titleActions, useTitleDispatch } from 'context/title';
import { userActions, useUserDispatch } from 'context/user';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../api';

function LoginPage() {
  const titleDispatch = useTitleDispatch();

  const userDispatch = useUserDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

    setIsLoading(true);

    try {
      const data = await api.auth.login({
        email: form.email,
        password: form.password,
      });

      enqueueSnackbar('Login Success!', {
        variant: 'success',
      });

      userActions.setUserData(userDispatch, {
        token: data.token,
        name: data.name,
        email: data.email,
      });

      navigate('/');
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: 'error',
      });
      setIsLoading(false);
    }
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
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
        >
          Login
        </LoadingButton>
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

export default LoginPage;

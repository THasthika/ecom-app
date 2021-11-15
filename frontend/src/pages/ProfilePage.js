import { titleActions, useTitleDispatch } from 'context/title';
import { useUser } from 'context/user';
import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const titleDispatch = useTitleDispatch();

  const user = useUser();

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Profile',
      documentTitle: 'Profile',
    });
  }, [titleDispatch]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {user.email}
      </Typography>
      <Button variant="contained" component={Link} to="/order-history">
        Order History
      </Button>
    </Box>
  );
}

export default ProfilePage;

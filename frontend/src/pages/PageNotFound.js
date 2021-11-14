import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useTitleDispatch, titleActions } from '../context/title';

const PageNotFound = () => {
  const dispatch = useTitleDispatch();

  useEffect(() => {
    titleActions.setTitle(dispatch, {
      documentTitle: 'Page Not Found',
      pageTitle: 'Page Not Found',
    });
  }, []);

  return (
    <div>
      <Typography variant="h3" textAlign="center" mt={5}>
        Page Not Found!
      </Typography>
    </div>
  );
};

export default PageNotFound;

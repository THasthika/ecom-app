import { Snackbar } from '@mui/material';
import React, { useContext, useReducer, useEffect } from 'react';
import { notifyReducer } from './reducer';

const { createContext } = require('react');

const initialState = {
  message: null,
  open: false,
};

const NotifyDispatchContext = createContext();

export const useNotifyDispatch = () => useContext(NotifyDispatchContext);

export const NotifyProvider = ({ children }) => {
  const [notify, dispatch] = useReducer(notifyReducer, initialState);

  const handleClose = () => {
    dispatch({ type: 'CLEAR_MESSAGE' });
  };

  return (
    <NotifyDispatchContext.Provider value={dispatch}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notify.open}
        onClose={handleClose}
        message={notify.message}
      />
      {children}
    </NotifyDispatchContext.Provider>
  );
};

import React, { useContext, useEffect, useMemo, useReducer } from 'react';

import { ThemeProvider as MaterialThemeProvider } from '@mui/material';

import { modeReducer } from './reducer';
import { createTheme } from '@mui/material/styles';

const { createContext } = require('react');

const initialState = 'light';

const initializer = localStorage.getItem('theme')
  ? JSON.parse(localStorage.getItem('theme'))
  : initialState;

const ThemeStateContext = createContext();
const ThemeDispatchContext = createContext();

export const useThemeState = () => useContext(ThemeStateContext);
export const useThemeDispatch = () => useContext(ThemeDispatchContext);

export const ThemeProvider = ({ children }) => {
  const [mode, dispatch] = useReducer(modeReducer, initializer);

  // Persist state on each update
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(mode));
  }, [mode]);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
      },
    });
  }, [mode]);

  return (
    <ThemeDispatchContext.Provider value={dispatch}>
      <ThemeStateContext.Provider value={mode}>
        <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
      </ThemeStateContext.Provider>
    </ThemeDispatchContext.Provider>
  );
};

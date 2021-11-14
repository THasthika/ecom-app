import React, { useContext, useEffect, useReducer } from 'react';
import { userReducer } from './reducer';

const { createContext } = require('react');

const initialState = null;

const initializer = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : initialState;

const UserStateContext = createContext();
const UserDispatchContext = createContext();

export const useUser = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initializer);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

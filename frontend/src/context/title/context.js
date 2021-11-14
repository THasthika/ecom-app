import React, { useContext, useReducer, useEffect } from 'react';
import { titleReducer } from './reducer';

const { createContext } = require('react');

const initialState = {
  pageTitle: 'ECommerceSite',
  documentTitle: 'ECommerceSite',
};

const TitleStateContext = createContext();
const TitleDispatchContext = createContext();

export const useTitle = () => useContext(TitleStateContext);
export const useTitleDispatch = () => useContext(TitleDispatchContext);

export const TitleProvider = ({ children }) => {
  const [title, dispatch] = useReducer(titleReducer, initialState);

  useEffect(() => {
    document.title = title.documentTitle;
  }, [title]);

  return (
    <TitleStateContext.Provider value={title}>
      <TitleDispatchContext.Provider value={dispatch}>
        {children}
      </TitleDispatchContext.Provider>
    </TitleStateContext.Provider>
  );
};

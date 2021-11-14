import React, { useContext, useEffect, useReducer } from 'react';
import { cartReducer } from './reducer';

const { createContext } = require('react');

const initialState = {
  items: [],
};

const initializer = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : initialState;

const CartStateContext = createContext();
const CartDispatchContext = createContext();

export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initializer);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartStateContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

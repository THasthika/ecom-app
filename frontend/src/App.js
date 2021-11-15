import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import CartPage from 'pages/CartPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import React from 'react';
import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/cart';
import { ThemeProvider } from './context/theme';
import { TitleProvider } from './context/title';
import { UserProvider, useUser } from './context/user';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Button } from '@mui/material';
import CheckoutPage from 'pages/CheckoutPage';
import ProfilePage from 'pages/ProfilePage';
import OrderHistoryPage from 'pages/OrderHistoryPage';

function RoutesHolder() {
  const user = useUser();

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      {!!user ? (
        <>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/order-history" element={<OrderHistoryPage />}></Route>
        </>
      ) : (
        <>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </>
      )}
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

function App() {
  // add action to all snackbars
  const notistackRef = useRef(); // or React.createRef
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <div>
      <ThemeProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          maxSnack={3}
          preventDuplicate
          ref={notistackRef}
          action={(key) => (
            <Button
              size="small"
              variant="inherit"
              onClick={onClickDismiss(key)}
            >
              Dismiss
            </Button>
          )}
        >
          <UserProvider>
            <CartProvider>
              <TitleProvider>
                <CssBaseline />
                <Layout>
                  <RoutesHolder />
                </Layout>
              </TitleProvider>
            </CartProvider>
          </UserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

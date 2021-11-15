import CssBaseline from '@mui/material/CssBaseline';
import { NotifyProvider } from 'context/notify';
import CartPage from 'pages/CartPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/cart';
import { ThemeProvider } from './context/theme';
import { TitleProvider } from './context/title';
import { UserProvider, useUser } from './context/user';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function RoutesHolder() {
  const user = useUser();

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      {!user && (
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
  return (
    <div>
      <NotifyProvider>
        <UserProvider>
          <CartProvider>
            <TitleProvider>
              <ThemeProvider>
                <CssBaseline />
                {/* <UserContext.Provider value={value}> */}
                <Layout>
                  <RoutesHolder />
                </Layout>
                {/* </UserContext.Provider> */}
              </ThemeProvider>
            </TitleProvider>
          </CartProvider>
        </UserProvider>
      </NotifyProvider>
    </div>
  );
}

export default App;

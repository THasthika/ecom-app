import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/theme';
import { TitleProvider } from './context/title';
import { UserProvider, useUser } from './context/user';
import { CartProvider } from './context/cart';
import Layout from './Layout';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Cart from 'pages/Cart';
import Register from 'pages/Register';
import Login from 'pages/Login';

function RoutesHolder() {
  const user = useUser();

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      {!user && (
        <>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </>
      )}
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
}

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;

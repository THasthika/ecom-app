import { useMemo, useState } from 'react';
import Header from './components/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Toolbar from '@mui/material/Toolbar';
import PageNotFound from './pages/PageNotFound';

import { ThemeProvider } from './context/theme';
import { TitleProvider } from './context/title';
import Layout from './Layout';

function App() {
  return (
    <div>
      <TitleProvider>
        <ThemeProvider>
          <CssBaseline />
          {/* <UserContext.Provider value={value}> */}
          <Layout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </Layout>
          {/* </UserContext.Provider> */}
        </ThemeProvider>
      </TitleProvider>
    </div>
  );
}

export default App;

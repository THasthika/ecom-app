import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/theme';
import { TitleProvider } from './context/title';
import Layout from './Layout';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

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

import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {
  useThemeDispatch,
  useThemeState,
  actions as themeActions,
} from '../context/theme';
import { BrightnessHigh, BrightnessLow } from '@mui/icons-material';
import { useTitle } from '../context/title';
// import { UserContext } from '../UserContext';

const Header = () => {
  // const user = useContext(UserContext);

  const title = useTitle();

  const theme = useThemeState();
  const themeDispatch = useThemeDispatch();

  return (
    <div>
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title.pageTitle}
            </Typography>
            <Button color="inherit">Login</Button>
            <IconButton onClick={() => themeActions.toggleTheme(themeDispatch)}>
              {theme === 'light' ? (
                <BrightnessLow></BrightnessLow>
              ) : (
                <BrightnessHigh></BrightnessHigh>
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;

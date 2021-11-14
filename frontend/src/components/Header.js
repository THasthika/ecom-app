import { BrightnessHigh, BrightnessLow } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  themeActions,
  useThemeDispatch,
  useThemeState,
} from '../context/theme';
import { useTitle } from '../context/title';
// import { UserContext } from '../UserContext';

const Header = () => {
  // const user = useContext(UserContext);

  const title = useTitle();

  const theme = useThemeState();
  const themeDispatch = useThemeDispatch();

  return (
    <AppBar position="fixed">
      <Container>
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
      </Container>
    </AppBar>
  );
};

export default Header;

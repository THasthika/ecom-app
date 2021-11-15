import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
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
import { styled } from '@mui/material/styles';
import { useCart } from 'context/cart';
import { Link, useNavigate } from 'react-router-dom';
import { userActions, useUser, useUserDispatch } from 'context/user';
import { useSnackbar } from 'notistack';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    padding: '0 4px',
  },
}));

function countItems(cart) {
  return cart.items.reduce((pv, cv) => {
    return pv + cv.amount;
  }, 0);
}

const Header = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const user = useUser();
  const userDispatch = useUserDispatch();

  const cart = useCart();

  const title = useTitle();

  const theme = useThemeState();
  const themeDispatch = useThemeDispatch();

  function handleLogout() {
    userActions.logoutUser(userDispatch);

    enqueueSnackbar('Logged Out Successfully!', {
      variant: 'success',
    });

    navigate('/');
  }

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title.pageTitle}
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          {!!user ? (
            <>
              <Button component={Link} to="/profile" color="inherit">
                {user.name}
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            </>
          )}
          <IconButton component={Link} to="/cart" sx={{ ml: 1 }}>
            <StyledBadge badgeContent={countItems(cart)} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => themeActions.toggleTheme(themeDispatch)}
          >
            {theme === 'light' ? <BrightnessLowIcon /> : <BrightnessHighIcon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

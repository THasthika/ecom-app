import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { getProductImageUrl, productPlaceholder } from 'api/products';
import { cartActions, useCart, useCartDispatch } from 'context/cart';
import { titleActions, useTitleDispatch } from 'context/title';
import { useUser } from 'context/user';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { formatPrice } from 'utils';

function CartPage() {
  const titleDispatch = useTitleDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const user = useUser();

  const cart = useCart();
  const cartDispatch = useCartDispatch();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Cart',
      documentTitle: 'Cart',
    });
  }, [titleDispatch]);

  useEffect(() => {
    const t = cart.items.reduce((pv, cv) => {
      return pv + cv.price * cv.amount;
    }, 0);
    setTotal(t);
  }, [cart, setTotal]);

  function handleOnDecrementAmount(cartItem) {
    cartActions.decrementAmount(cartDispatch, { id: cartItem.id });
  }

  function handleOnIncrementAmount(cartItem) {
    cartActions.incrementAmount(cartDispatch, { id: cartItem.id });
  }

  function handleOnDeleteItem(cartItem) {
    cartActions.removeItem(cartDispatch, { id: cartItem.id });
  }

  function handleOnCheckout() {
    if (!user) {
      enqueueSnackbar('must be logged in', { variant: 'warning' });
      return;
    }
    navigate('/checkout');
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Items
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {cart.items.map((cartItem) => {
        const productImage =
          cartItem.images.length > 0
            ? getProductImageUrl(cartItem.images[0])
            : productPlaceholder;
        return (
          <Card sx={{ display: 'flex', mb: 2 }} key={cartItem.id}>
            <CardMedia
              component="img"
              sx={{ maxWidth: 250 }}
              image={productImage}
              alt={cartItem.title}
            />
            <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6">
                  {cartItem.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {cartItem.description}
                </Typography>
              </CardContent>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'right',
              }}
            >
              <CardContent
                sx={{
                  justifyContent: 'right',
                  justifyItems: 'right',
                  textAlign: 'right',
                  pr: 0,
                  mr: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'right',
                  }}
                >
                  <IconButton onClick={() => handleOnDeleteItem(cartItem)}>
                    <DeleteForeverIcon></DeleteForeverIcon>
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {formatPrice(cartItem.price * cartItem.amount)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'right',
                  }}
                >
                  <IconButton onClick={() => handleOnDecrementAmount(cartItem)}>
                    <RemoveIcon></RemoveIcon>
                  </IconButton>
                  <Typography variant="body2">x{cartItem.amount}</Typography>
                  <IconButton onClick={() => handleOnIncrementAmount(cartItem)}>
                    <AddIcon></AddIcon>
                  </IconButton>
                </Box>
              </CardContent>
            </Box>
          </Card>
        );
      })}
      <Typography
        variant="subtitle1"
        sx={{ mt: 2, textAlign: 'right', fontWeight: 700 }}
      >
        Total: {formatPrice(total)}
      </Typography>
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Button variant="contained" color="primary" onClick={handleOnCheckout}>
          Checkout
        </Button>
      </Box>
    </div>
  );
}

export default CartPage;

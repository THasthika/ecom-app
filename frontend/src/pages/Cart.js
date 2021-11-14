import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { titleActions, useTitleDispatch } from 'context/title';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { formatPrice } from 'utils';
import { cartActions, useCart, useCartDispatch } from 'context/cart';
import { getProductImageUrl } from 'api/products';

function Cart() {
  const titleDispatch = useTitleDispatch();

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

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Items
      </Typography>
      <Divider />
      <Typography variant="h6" sx={{ mt: 2, textAlign: 'right' }}>
        Total: {formatPrice(total)}
      </Typography>
      {cart.items.map((cartItem) => (
        <Card sx={{ display: 'flex', mb: 2 }} key={cartItem.id}>
          {cartItem.images.length > 0 && (
            <CardMedia
              component="img"
              sx={{ maxWidth: 250 }}
              image={getProductImageUrl(cartItem.images[0])}
              alt={cartItem.title}
            />
          )}
          <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
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
                mr: 0,
                pr: 0,
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
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Subtotal: {formatPrice(cartItem.price * cartItem.amount)}
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
                <Typography variant="h6">Qty {cartItem.amount}</Typography>
                <IconButton onClick={() => handleOnIncrementAmount(cartItem)}>
                  <AddIcon></AddIcon>
                </IconButton>
              </Box>
            </CardContent>
          </Box>
        </Card>
      ))}
    </div>
  );
}

export default Cart;

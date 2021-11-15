import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import api from '../api';
import { cartActions, useCart, useCartDispatch } from 'context/cart';
import { titleActions, useTitleDispatch } from 'context/title';
import { useUser } from 'context/user';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from 'utils';

function CheckoutPage() {
  const titleDispatch = useTitleDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const user = useUser();

  const cart = useCart();
  const cartDispatch = useCartDispatch();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Checkout',
      documentTitle: 'Checkout',
    });
  }, [titleDispatch]);

  useEffect(() => {
    const t = cart.items.reduce((pv, cv) => {
      return pv + cv.price * cv.amount;
    }, 0);
    setTotal(t);
  }, [cart, setTotal]);

  async function handleOnOrder() {
    const products = cart.items.map((v) => {
      return { id: v.id, amount: v.amount };
    });
    try {
      await api.orders.createOrder({
        token: user.token,
        products,
      });
      cartActions.clearCart(cartDispatch);
      enqueueSnackbar('Order Placed!');
    } catch (err) {
      enqueueSnackbar(err);
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List disablePadding>
        {cart.items.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.title}
              secondary={product.description}
            />
            <Typography variant="body2" sx={{ mr: 1 }}>
              {`(${formatPrice(product.price)} x ${product.amount})`}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatPrice(product.price * product.amount)}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formatPrice(total)}
          </Typography>
        </ListItem>
      </List>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ mr: 2 }}
          color="error"
        >
          Cancel
        </Button>
        <Button onClick={handleOnOrder} variant="contained">
          Order
        </Button>
      </Box>
    </Box>
  );
}

export default CheckoutPage;

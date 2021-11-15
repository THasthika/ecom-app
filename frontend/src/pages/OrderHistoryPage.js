import api from '../api';
import { titleActions, useTitleDispatch } from '../context/title';
import { useUser } from '../context/user';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { formatPrice } from '../utils';

const state = {
  orders: [
    {
      id: 6,
      userId: 3,
      createdAt: '2021-11-15T12:54:41.424Z',
      updatedAt: '2021-11-15T12:54:41.424Z',
      orderItems: [
        {
          id: 9,
          orderId: 6,
          productId: 8,
          amount: 3,
          price: '200.00',
          createdAt: '2021-11-15T12:54:41.428Z',
          updatedAt: '2021-11-15T12:54:41.428Z',
        },
      ],
    },
    {
      id: 5,
      userId: 3,
      createdAt: '2021-11-15T12:48:36.555Z',
      updatedAt: '2021-11-15T12:48:36.555Z',
      orderItems: [
        {
          id: 8,
          orderId: 5,
          productId: 8,
          amount: 5,
          price: '200.00',
          createdAt: '2021-11-15T12:48:36.560Z',
          updatedAt: '2021-11-15T12:48:36.560Z',
        },
      ],
    },
  ],
  products: [
    {
      id: 8,
      title: 'Product - 2',
      description: 'Lorem 123321',
      price: '200.00',
      quantity: 6,
      createdAt: '2021-11-14T18:52:48.969Z',
      updatedAt: '2021-11-15T12:54:41.419Z',
      images: [
        {
          productId: 8,
          name: 'rwoxtuYSVsGPnmcloIPAlaENLXZAvdxJkaKFdnTT',
          extension: 'jpeg',
          rank: 1,
        },
      ],
    },
  ],
};

function OrderItemView({ orderItem, product }) {
  return (
    <ListItem sx={{ py: 1, px: 0 }}>
      <ListItemText primary={product.title} secondary={product.description} />
      <Typography variant="body2" sx={{ mr: 1 }}>
        {`(${formatPrice(orderItem.price)} x ${orderItem.amount})`}
      </Typography>
      <Typography variant="body2" fontWeight="bold">
        {formatPrice(orderItem.price * orderItem.amount)}
      </Typography>
    </ListItem>
  );
}

function OrderView({ order, productMap }) {
  const total = order.orderItems.reduce((pv, cv) => {
    return pv + cv.amount * cv.price;
  }, 0);
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold">
        Order Id: {order.id}
      </Typography>
      <Typography variant="subtitle2" fontWeight="bold">
        Date: {order.createdAt}
      </Typography>
      <Divider />
      {order.orderItems.map((v) => (
        <OrderItemView
          key={`${order.id}-${v.id}`}
          orderItem={v}
          product={productMap[v.productId]}
        />
      ))}
      <Divider />
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Total: {formatPrice(total)}
        </Typography>
      </Box>
    </Paper>
  );
}

function OrderHistoryHolder({ orders, products }) {
  const productMap = products.reduce((pv, cv) => {
    pv[cv.id] = cv;
    return pv;
  }, {});
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order History
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {orders.map((order) => (
        <OrderView key={order.id} order={order} productMap={productMap} />
      ))}
    </Box>
  );
}

function OrderHistoryPage() {
  const titleDispatch = useTitleDispatch();

  const user = useUser();

  const [orderHistory, setOrderHistory] = useState({
    orders: [],
    products: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Order History',
      documentTitle: 'Order History',
    });
  }, [titleDispatch]);

  const loadingDiv = <div>Loading...</div>;
  const errorDiv = <div>Error...</div>;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    async function fetchData() {
      try {
        // const data = await api.orders.getOrderHistory({ token: user.token });
        // console.log(data);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) {
    return loadingDiv;
  } else {
    if (isError) {
      return errorDiv;
    } else {
      return (
        <OrderHistoryHolder orders={state.orders} products={state.products} />
      );
    }
  }
}

export default OrderHistoryPage;

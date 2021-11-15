import api from '../api';
import { titleActions, useTitleDispatch } from '../context/title';
import { useUser } from '../context/user';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

function OrderItemView({ orderItem, products }) {
  return <Box>2</Box>;
}

function OrderView({ order, products }) {}

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

  const orderHistoryDiv = () => <div>Order History</div>;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    async function fetchData() {
      const data = await api.orders.getOrderHistory({ token: user.token });
      console.log(data);
    }

    fetchData();
  }, []);

  if (isLoading) {
    return loadingDiv;
  } else {
    if (isError) {
      return errorDiv;
    } else {
      return orderHistoryDiv();
    }
  }
}

export default OrderHistoryPage;

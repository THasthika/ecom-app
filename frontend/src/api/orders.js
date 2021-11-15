import axios from 'axios';
import { apiHost, handleApiError } from './utils';

const createOrderUrl = `${apiHost}/orders`;

export async function createOrder({ token, products }) {
  try {
    const response = await axios(createOrderUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { products },
      method: 'POST',
    });
    return response.data.data;
  } catch (err) {
    handleApiError(err);
  }
}

const orderHistoryUrl = `${apiHost}/orders`;

export async function getOrderHistory({ token }) {
  try {
    const response = await axios(orderHistoryUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    });
    return response.data.data;
  } catch (err) {
    handleApiError(err);
  }
}

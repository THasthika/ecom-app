import axios from 'axios';
import { apiHost, handleApiError } from './utils';

export async function queryProducts({ params, page, perPage }) {
  const limit = perPage;
  const offset = (page - 1) * perPage;
  const p = {
    ...params,
    offset,
    limit,
  };
  const queryString = Object.keys(p)
    .filter((v) => {
      if (p[v] === '') return false;
      if (!p[v]) return false;
      return true;
    })
    .map((v) => {
      return `${v}=${p[v]}`;
    })
    .join('&');

  const url = `${apiHost}/products/query?${queryString}`;

  try {
    const response = await axios(url, {
      method: 'GET',
    });

    const data = response.data.data;

    return { products: data.products, totalProducts: data.totalCount };
  } catch (err) {
    handleApiError(err);
  }
}

export async function getProductById({ id }) {
  const url = `${apiHost}/products/${id}`;

  try {
    const response = await axios(url, {
      method: 'GET',
    });

    const data = response.data.data;

    return { product: data };
  } catch (err) {
    handleApiError(err);
  }
}

export async function getProductImages({ id }) {
  const url = `${apiHost}/products/${id}/images`;

  try {
    const response = await axios(url, {
      method: 'GET',
    });

    const data = response.data.data;

    return { images: data };
  } catch (err) {
    handleApiError(err);
  }
}

export function getProductImageUrl(productImage) {
  return `${apiHost}/products/${productImage.productId}/images/${productImage.name}`;
}

export const productPlaceholder = `${apiHost}/placeholders/product`;

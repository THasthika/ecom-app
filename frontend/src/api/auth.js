import { apiHost, handleApiError } from './utils';
import axios from 'axios';

export async function login({ email, password }) {
  const url = `${apiHost}/auth/login`;
  try {
    const response = await axios(url, {
      method: 'POST',
      data: {
        email,
        password,
      },
    });
    return response.data.data;
  } catch (err) {
    handleApiError(err);
  }
}

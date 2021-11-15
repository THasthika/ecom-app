import { apiHost, handleApiError } from './utils';
import axios from 'axios';

const loginUrl = `${apiHost}/auth/login`;

export async function login({ email, password }) {
  try {
    const response = await axios(loginUrl, {
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

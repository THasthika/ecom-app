import { apiHost, handleApiError } from 'api/utils';
import axios from 'axios';

export async function register({ name, email, password }) {
  const url = `${apiHost}/users`;

  try {
    return await axios(url, {
      method: 'POST',
      data: {
        name,
        email,
        password,
      },
    });
  } catch (err) {
    handleApiError(err);
  }
}

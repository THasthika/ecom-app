import { apiHost, handleApiError } from 'api/utils';
import axios from 'axios';

const registerUserUrl = `${apiHost}/users`;

export async function register({ name, email, password }) {
  try {
    return await axios(registerUserUrl, {
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

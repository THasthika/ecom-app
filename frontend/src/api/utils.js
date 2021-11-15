export const apiHost = 'http://localhost:8001';

export function handleApiError(err) {
  const data = err.response.data;
  if (err.response && err.response.data) {
    if (data.data) {
      throw new Error(data.data.errors[0]);
    } else {
      throw new Error(data.error);
    }
  }
  throw new Error('error');
}

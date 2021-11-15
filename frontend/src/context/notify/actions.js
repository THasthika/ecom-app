export const setMessage = (dispatch, { message }) => {
  dispatch({
    type: 'SET_MESSAGE',
    payload: message,
  });
};

export const clearMessage = (dispatch) => {
  dispatch({
    type: 'CLEAR_MESSAGE',
  });
};

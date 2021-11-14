export const setUserData = (dispatch, { token, name }) => {
  dispatch({
    type: 'SET_USER_DATA',
    payload: { token, name },
  });
};

export const logoutUser = (dispatch) => {
  dispatch({
    type: 'USER_LOGOUT',
  });
};

export const setUserData = (dispatch, { token, name }) => {
  dispatch({
    type: 'SET_USER_DATA',
    payload: title,
  });
};

export const logoutUser = (dispatch) => {
  dispatch({
    type: 'USER_LOGOUT',
  });
};

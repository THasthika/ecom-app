export const addItem = (dispatch, payload) => {
  dispatch({
    type: 'ADD_ITEM',
    payload: payload,
  });
};

export const removeItem = (dispatch, { id }) => {
  dispatch({
    type: 'REMOVE_ITEM',
    payload: { id },
  });
};

export const incrementAmount = (dispatch, { id }) => {
  dispatch({
    type: 'INCREMENT_AMOUNT',
    payload: { id },
  });
};

export const decrementAmount = (dispatch, { id }) => {
  dispatch({
    type: 'DECREMENT_AMOUNT',
    payload: { id },
  });
};

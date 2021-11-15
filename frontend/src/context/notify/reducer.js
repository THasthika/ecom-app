export const notifyReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: payload,
      };
    case 'CLEAR_MESSAGE':
      return {
        ...state,
        message: null,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

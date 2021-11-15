export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_ITEM': {
      const { id } = payload;

      const exists =
        state.items.filter((v) => {
          return v.id === id;
        }).length === 1;

      let newItems;

      if (!exists) {
        newItems = [
          ...state.items,
          {
            ...payload,
            amount: 1,
          },
        ];
      } else {
        newItems = state.items.map((v) => {
          if (v.id === id) {
            v.amount += 1;
          }
          return v;
        });
      }

      return {
        ...state,
        items: newItems,
      };
    }
    case 'INCREMENT_AMOUNT': {
      const { id } = payload;
      const newItems = state.items.map((v) => {
        if (v.id === id) {
          v.amount += 1;
        }
        return v;
      });
      return {
        ...state,
        items: newItems,
      };
    }
    case 'DECREMENT_AMOUNT': {
      const { id } = payload;
      const newItems = state.items
        .map((v) => {
          if (v.id === id) {
            v.amount -= 1;
          }
          return v;
        })
        .filter((v) => {
          return v.amount > 0;
        });
      return {
        ...state,
        items: newItems,
      };
    }
    case 'REMOVE_ITEM': {
      const { id } = payload;
      const newItems = state.items.filter((v) => {
        return v.id !== id;
      });
      return {
        ...state,
        items: newItems,
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

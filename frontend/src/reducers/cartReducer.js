import {
  ADD_TO_CART_SUCCESS,
  EMPTY_CART,
  REMOVE_FROM_CART,
} from "../constants/cart-constants";

export const cartReducer = (state = { cartItem: [] }, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART_SUCCESS:
      const index = state.cartItem.findIndex(
        (item) => item._id === payload._id
      );
      if (index >= 0) {
        state.cartItem[index].qty = payload.qty;
        return {
          ...state,
          isLoading: false,
          cartItem: [...state.cartItem],
        };
      } else {
        return {
          ...state,
          isLoading: false,
          cartItem: [...state.cartItem, payload],
        };
      }

    case REMOVE_FROM_CART:
      const updateCart = state.cartItem.filter(
        (item) => item._id !== payload.id
      );
      return { ...state, isLoading: false, cartItem: updateCart };
    case EMPTY_CART:
      return { ...state, cartItem: [] };
    default:
      return state;
  }
};

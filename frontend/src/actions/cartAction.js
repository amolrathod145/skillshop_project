import {
  ADD_TO_CART_SUCCESS,
  EMPTY_CART,
  REMOVE_FROM_CART,
} from "../constants/cart-constants";
export const cartAction =
  item => async (dispatch, getState) => {
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: item });
    const localCart = getState().cart.cartItem;
    localStorage.setItem("cart", JSON.stringify(localCart));
  };
export const removeFromCartAction =
  id => async (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
    const localCart = getState().cart.cartItem;
    localStorage.setItem("cart", JSON.stringify(localCart));
  };
export const emptyCartAction =
  () => async (dispatch, getState) => {
    dispatch({ type: EMPTY_CART });
    const localCart = getState().cart.cartItem;
    localStorage.setItem("cart", JSON.stringify(localCart));
  };

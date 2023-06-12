import axios from "axios";
import { EMPTY_CART } from "../constants/cart-constants";
import {
  PLACE_USER_ORDER_FAIL,
  PLACE_USER_ORDER_REQUEST,
  PLACE_USER_ORDER_SUCCESS,
} from "../constants/order-contants";

export const orderAction =
  formData => async (dispatch, getState) => {
    try {
      dispatch({ type: PLACE_USER_ORDER_REQUEST });
      const cartItem = getState().cart.cartItem;
      const productData = cartItem.map(item => {
        return { id: item._id, qty: item.qty };
      });
      const orders = {
        products: productData,
        ...formData,
      };
      const config = {
        headers: {
          Authorization:
            getState().loggedIn.loginUser.token,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/order`,
        orders,
        config
      );
      dispatch({
        type: PLACE_USER_ORDER_SUCCESS,
        payload: data.result,
      });
      localStorage.removeItem("cart");
      dispatch({ type: EMPTY_CART });
    } catch (error) {
      dispatch({
        type: PLACE_USER_ORDER_FAIL,
        payload: error,
      });
    }
  };

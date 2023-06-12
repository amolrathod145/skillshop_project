import {
  PLACE_USER_ORDER_FAIL,
  PLACE_USER_ORDER_REQUEST,
  PLACE_USER_ORDER_SUCCESS,
} from "../constants/order-contants";

export const orderReducer = (
  state = { placedOrder: {} },
  { type, payload }
) => {
  switch (type) {
    case PLACE_USER_ORDER_REQUEST:
      return { isLoading: true };
    case PLACE_USER_ORDER_SUCCESS:
      return { isLoading: false, placedOrder: payload };
    case PLACE_USER_ORDER_FAIL:
      return { isLoading: false, error: payload };
    default:
      return state;
  }
};

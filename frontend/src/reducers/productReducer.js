import {
  PRODUCT_REQUEST,
  PRODUCT_REQUEST_SUCCESS,
  PRODUCT_REQUEST_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_REQUEST_SUCCESS,
  SINGLE_PRODUCT_REQUEST_FAIL,
} from "./../constants/product-constants";
export const getAllProductReducer = (
  state = { reduxProducts: [], reduxSingleProduct: {}, isLoading: false },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_REQUEST:
      return { ...state, isLoading: true };
    case PRODUCT_REQUEST_SUCCESS:
      return { ...state, reduxProducts: payload, isLoading: false };
    case PRODUCT_REQUEST_FAIL:
      return { reduxProductsError: payload, isLoading: false };

    case SINGLE_PRODUCT_REQUEST:
      return { ...state, isLoading: true };
    case SINGLE_PRODUCT_REQUEST_SUCCESS:
      return { ...state, reduxSingleProduct: payload, isLoading: false };
    case SINGLE_PRODUCT_REQUEST_FAIL:
      return { reduxSingleProductError: payload, isLoading: false };
    default:
      return state;
  }
};

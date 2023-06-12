import {
  PRODUCT_REQUEST,
  PRODUCT_REQUEST_SUCCESS,
  PRODUCT_REQUEST_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_REQUEST_SUCCESS,
  SINGLE_PRODUCT_REQUEST_FAIL,
} from "../constants/product-constants";
import axios from "axios";
export const getAllProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/product`
    );
    dispatch({ type: PRODUCT_REQUEST_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: PRODUCT_REQUEST_FAIL, payload: error });
  }
};

export const getSingleProductsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/product/${id}`
    );
    console.log(data);
    dispatch({ type: SINGLE_PRODUCT_REQUEST_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: SINGLE_PRODUCT_REQUEST_FAIL, payload: error });
  }
};

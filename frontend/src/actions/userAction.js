import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  USER_ADDRESS_REQUEST,
  USER_ADDRESS_SUCCESS,
  USER_ADDRESS_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../constants/userConstants";
import axios from "axios";
import { FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQ, FORGET_PASSWORD_SUCCESS } from "../constants/ForgetPassword";
export const userSignupAction =
  formData => async dispatch => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/user/signup`,
        formData
      );
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data.result,
      });
    } catch (error) {
      dispatch({ type: USER_SIGNUP_FAIL, payload: error });
    }
  };
export const getAllUsersAction = () => async dispatch => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/user`
    );
    dispatch({
      type: ALL_USER_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    dispatch({ type: ALL_USER_FAIL, payload: error });
  }
};
export const addAddressAction =
  formData => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_ADDRESS_REQUEST });
      const config = {
        headers: {
          Authorization:
            getState().loggedIn.loginUser.token,
        },
      };

      console.warn(getState().loggedIn.loginUser.token);
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/user/address`,
        formData,
        config
      );
      dispatch({
        type: USER_ADDRESS_SUCCESS,
        payload: data.result,
      });
    } catch (error) {
      dispatch({ type: USER_ADDRESS_FAIL, payload: error });
    }
  };
export const ForgetPasswordAction =
  email => async (dispatch, getState) => {
    try {
      dispatch({ type: FORGET_PASSWORD_REQ });
      console.warn(getState().loggedIn.loginUser.token);
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/auth/password-reset`,
        email
      );
      dispatch({
        type: FORGET_PASSWORD_SUCCESS,
        payload: data.result,
      });
    } catch (error) {
      dispatch({ type: FORGET_PASSWORD_FAIL, payload: error });
    }
  };

// export const deleteUserAction =
//   email => async (dispatch, getState) => {
//     try {
//       dispatch({ type: USER_DELETE_REQUEST });
//       console.warn(getState().loggedIn.loginUser.token);
//       const { data } = await axios.delete(
//         `${process.env.REACT_APP_URL}/api/auth/password-reset`,
//         email
//       );
//       dispatch({
//         type: USER_DELETE_SUCCESS,
//         payload: data.result,
//       });
//     } catch (error) {
//       dispatch({ type: USER_DELETE_FAIL, payload: error });
//     }
//   };

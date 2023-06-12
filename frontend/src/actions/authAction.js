import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";
export const loginAction =
  credentials => async dispatch => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/auth/login`,
        credentials
      );
      localStorage.setItem(
        "user",
        JSON.stringify(data.result)
      );
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.result,
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.responce.data.message || "Something went wrong",
      });
    }
  };

export const logoutAction = () => async dispatch => {
  localStorage.removeItem("user");
  dispatch({
    type: USER_LOGOUT,
  });
};

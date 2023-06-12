import { FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQ, FORGET_PASSWORD_SUCCESS } from "../constants/ForgetPassword";
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
} from "../constants/userConstants";
export const userSignupReducer = (
  state = { info: {}, users: [] },
  { type, payload }
) => {
  switch (type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, isLoading: true };
    case USER_SIGNUP_SUCCESS:
      return { ...state, info: payload, isLoading: false };
    case USER_SIGNUP_FAIL:
      return { ...state, error: payload, isLoading: false };

    case ALL_USER_REQUEST:
      return { ...state, isLoading: true };
    case ALL_USER_SUCCESS:
      return { ...state, users: payload, isLoading: false };
    case ALL_USER_FAIL:
      return { ...state, error: payload, isLoading: false };

    case USER_ADDRESS_REQUEST:
      return { ...state, isLoading: true };
    case USER_ADDRESS_SUCCESS:
      return {
        ...state,
        address: payload,
        isLoading: false,
      };
    case USER_ADDRESS_FAIL:
      return { ...state, isLoading: true };

    case FORGET_PASSWORD_REQ:
      return { ...state, isLoading: true };
    case FORGET_PASSWORD_SUCCESS:
      return { ...state, forget: true, isLoading: false };
    case FORGET_PASSWORD_FAIL:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};

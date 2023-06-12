import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const loginReducer = (
  state = {},
  { type, payload }
) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { isLoading: true };
    case USER_LOGIN_SUCCESS:
      return { loginUser: payload, isLoading: false };
    case USER_LOGIN_FAIL:
      return { error: payload, isLoading: false };
    case USER_LOGOUT:
      return { loginUser: undefined, isLoading: false };
    default:
      return state;
  }
};

import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userSignupReducer } from "./reducers/userReducer";
import { getAllProductReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { loginReducer } from "./reducers/authReducer";
import { orderReducer } from "./reducers/orderReducer";

const localStorageCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const localStorageLoggedInUser = localStorage.getItem(
  "user"
)
  // ? JSON.parse(localStorage.getItem("user"))
  ? undefined
  : undefined;

const initialState = {
  loggedIn: {
    loginUser: localStorageLoggedInUser,
  },
  cart: {
    cartItem: localStorageCart,
  },
};
const rootReducer = combineReducers({
  user: userSignupReducer,
  products: getAllProductReducer,
  cart: cartReducer,
  loggedIn: loginReducer,
  placedOrder: orderReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

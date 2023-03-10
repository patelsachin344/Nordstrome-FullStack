import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { reducer1 } from "../src/Features/Register/reducer1";
import { reducer2 } from "../src/Features/Login/reducer2";
import { productReducer } from "./Redux/reducer";
import thunk from "redux-thunk";
import { cartReducer } from "./Features/cart/reducer";
import { laterReducer } from "./Features/later/reducer";

const reducer = combineReducers({
  registerState: reducer1,
  loginState: reducer2,
  product: productReducer,
  cart: cartReducer,
  later: laterReducer,
});
const middleware = applyMiddleware(thunk);

// let initialState = {};

const store = createStore(reducer, middleware);

export default store;

// const { Cart_Load, Cart_Success, Cart_Error } = require("./actionType");
import { Cart_Load, Cart_Success, Cart_Error } from "./actionType";

export const cartloading = () => {
  return {
    type: Cart_Load,
  };
};

export const cartSuccessing = (data) => {
  return {
    type: Cart_Success,
    payload: data,
  };
};

export const cartErroring = () => {
  return {
    type: Cart_Error,
  };
};

export const getdata = (id) => (dispatch) => {
  fetch(`http://localhost:5000/carts/${id}`)
    .then((res) => res.json())
    .then((res) => console.log(res, "form action"))
    .catch(() => dispatch(cartErroring));
};

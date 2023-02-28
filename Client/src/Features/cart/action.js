// const { Cart_Load, Cart_Success, Cart_Error } = require("./actionType");
import {
  Cart_Load,
  Cart_Success,
  Cart_Error,
  Cart_Updating,
  Cart_Deleting,
  Cart_Adding,
  Cart_AllDeleting,
} from "./actionType";

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
export const cartAdding = () => {
  return {
    type: Cart_Adding,
  };
};
export const cartUpdating = () => {
  return {
    type: Cart_Updating,
  };
};
export const cartDelete = () => {
  return {
    type: Cart_Deleting,
  };
};
export const cartAllDelete = () => {
  return {
    type: Cart_AllDeleting,
  };
};

export const cartErroring = () => {
  return {
    type: Cart_Error,
  };
};

export const getData = (id) => (dispatch) => {
  fetch(`nordstrome-fullstack-production.up.railway.app/carts/${id}`)
    .then((res) => res.json())
    .then((res) => dispatch(cartSuccessing(res)))
    .catch(() => dispatch(cartErroring));
};

export const createData = (id, item) => (dispatch) => {
  // console.log(item, "from cart action");
  fetch(`nordstrome-fullstack-production.up.railway.app/carts/${id}`, {
    method: "POST",
    body: JSON.stringify({ products: item, userId: id }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(cartAdding());
      dispatch(getData(id));
    })
    .catch(() => dispatch(cartErroring()));
};

export const updateData = (cartId, count, userId) => (dispatch) => {
  fetch(`nordstrome-fullstack-production.up.railway.app/carts/${cartId}`, {
    method: "PATCH",
    body: JSON.stringify({ count }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(cartUpdating());
      dispatch(getData(userId));
    });
};

export const deleteData = (cartId, userId) => (dispatch) => {
  fetch(`nordstrome-fullstack-production.up.railway.app/carts/${cartId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(cartDelete());
      dispatch(getData(userId));
    });
};
export const deleteAllData = (userId) => (dispatch) => {
  fetch(
    `nordstrome-fullstack-production.up.railway.app/carts/deleteAll/${userId}`,
    {
      method: "DELETE",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      dispatch(cartDelete());
      dispatch(getData(userId));
    });
};

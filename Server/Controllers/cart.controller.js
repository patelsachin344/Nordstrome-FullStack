const Cart = require("../Models/cart.model");

const getCart = async (id) => {
  const cartData = await Cart.find({
    "userId._id": id,
  });
  return cartData;
};

const addCart = async (id, body) => {
  const userCartData = await getCart(id);

  let res;
  if (userCartData) {
    res = userCartData.filter((el) => el.products.id === body.products.id);
  }
  let data;

  if (res.length === 0) {
    return (data = await Cart.create(body));
  }

  return res;
};

module.exports = { getCart, addCart };

const Cart = require("../Models/cart.model");

const getCart = async (id) => {
  const cartData = await Cart.find({
    userId: id,
  });
  return cartData;
};
const getOneCart = async (id) => {
  const cartData = await Cart.find({
    userId: id,
  });
  return cartData;
};

const addCart = async (id, body) => {
  const userCartData = await getCart(id);
  // console.log(body);
  let res;
  if (userCartData) {
    res = userCartData.filter((el) => el.products.id == body.products.id);
  }

  if (res.length <= 0) {
    return await Cart.create(body);
  }

  return "Data already exists";
};

const updateCart = async (id, count) => {
  const getData = await Cart.findById(id);
  console.log(count, "cart");
  const data = await getData.updateOne(
    { "products.count": count },
    { new: true }
  );
  return data;
};

const deleteCart = async (id) => {
  const data = await Cart.findByIdAndDelete(id);
  return data;
};

const deleteAllCart = async (id) => {
  const data = await Cart.deleteMany({ userId: id });
  return data;
};

module.exports = { getCart, addCart, updateCart, deleteCart, deleteAllCart };

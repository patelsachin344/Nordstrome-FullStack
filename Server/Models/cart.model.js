const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: {
    id: Number,
    searchImage: String,
    images: Array,
    product: String,
    sizes: String,
    brand: String,
    price: String,
    mrp: String,
    count: String,
    discountDisplayLabel: String,
  },
  userId: {
    _id: mongoose.Schema.Types.ObjectId,
  },
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;

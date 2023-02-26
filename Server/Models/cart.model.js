const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: {
    id: Number,
    searchImage: String,
    images: Array,
    product: String,
    sizes: Array,
    brand: String,
    price: String,
    mrp: String,
    count: String,
    discountDisplayLabel: String,
    count: { type: Number, default: 1 },
  },
  userId: mongoose.Schema.Types.ObjectId,
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;

const mongoose = require("mongoose");

const laterSchema = new mongoose.Schema({
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

const Later = mongoose.model("laters", laterSchema);

module.exports = Later;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  landingPageUrl: String,
  id: String,
  product: String,
  productName: String,
  rating: Number,
  ratingCount: Number,
  discount: Number,
  brand: String,
  searchImage: String,
  effectiveDiscountPercentageAfterTax: Number,
  effectiveDiscountAmountAfterTax: Number,
  inventoryInfo: Array,
  sizes: Array,
  images: Array,
  gender: String,
  primaryColour: String,
  discountLabel: String,
  discountDisplayLabel: String,
  additionalInfo: String,
  category: String,
  mrp: Number,
  price: Number,
  colorVariantAvailable: Boolean,
  discountType: String,
  season: String,
  year: String,
  systemAttributes: Array,
});

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;

// const productModel = require("./Models/products.model");
// fs.readFile("./db.json", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
//   console.log("created product");
//   productModel.create(JSON.parse(data));
// });

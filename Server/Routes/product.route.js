const express = require("express");
const { getProduct } = require("../Controllers/product.controller");

const productRouter = express();

productRouter.get("/", async (req, res) => {
  const { page, limit, gender, brand, price } = req.query;
  console.log(page, limit);

  const { product, count } = await getProduct(
    page,
    limit,
    gender,
    brand,
    price
  );

  res.status(200).send({
    count,
    products: product,
    message: "Product was successfully retrieved",
  });
});

module.exports = productRouter;

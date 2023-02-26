const express = require("express");
const { getProduct } = require("../Controllers/product.controller");

const productRouter = express();

productRouter.get("/", async (req, res) => {
  const { page, limit, gender, brand, _sort, _order } = req.query;
  // console.log(req.query);
  try {
    const { product, count } = await getProduct(
      page,
      limit,
      gender,
      brand,
      _sort,
      _order
    );

    if (product.length) {
      res.status(200).send({
        count,
        products: product,
        message: "Product was successfully retrieved",
      });
    } else {
      res.status(400).send({
        count,
        products: product,
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      Error: error.message,
    });
  }
});

module.exports = productRouter;

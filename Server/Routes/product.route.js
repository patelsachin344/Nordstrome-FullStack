const express = require("express");
const {
  getProduct,
  getOneProduct,
} = require("../Controllers/product.controller");

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

productRouter.get("/:productId", async (req, res) => {
  try {
    const id = req.params.productId;
    const data = await getOneProduct(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

module.exports = productRouter;

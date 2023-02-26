const {
  addCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../Controllers/cart.controller");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cartData = await getCart(id);
    res.status(200).send({ success: cartData });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await addCart(id, body);
    res.status(200).send({ success: data });
  } catch (error) {
    res.status(400).send({
      error: error,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { count } = req.body;
    const data = await updateCart(id, count);
    res.status(200).send({ success: data });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await deleteCart(id);
    res.status(200).send({ success: data });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = router;

const {
  getLater,
  addLater,
  deleteLater,
} = require("../Controllers/later.controller");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getLater(id);
    res.status(200).send({ success: data });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const data = await addLater(id, body);
    res.status(200).send({ success: data });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.delete("/:laterId", async (req, res) => {
  try {
    const id = req.params.laterId;
    const data = await deleteLater(id);
    res.status(200).send({ success: data });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = router;

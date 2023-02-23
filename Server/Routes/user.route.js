const { registerUser, loginUser } = require("../Controllers/user.controller");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

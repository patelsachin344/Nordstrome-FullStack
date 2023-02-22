const User = require("../Models/users.model");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return user;
  } catch (error) {}
});
module.exports = router;

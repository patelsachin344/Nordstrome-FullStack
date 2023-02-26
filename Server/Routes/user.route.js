const router = require("express").Router();

const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../Controllers/user.controller");

router.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(200).json({ user: user });
  } catch (error) {
    if (
      error.message ===
      `E11000 duplicate key error collection: nordstromeData.users index: email_1 dup key: { email: \"${req.body.email}\" }`
    ) {
      res.status(400).json({ error: "Email already exist" });
    } else if (
      error.message ===
        "User validation failed: first_name: Path `first_name` is required." ||
      error.message ===
        "User validation failed: last_name: Path `last_name` is required."
    ) {
      res.status(400).json({ error: "Please Fill All Required Fields" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/logedin", (req, res) => {
  const auth = req.headers.authorization;

  if (auth) {
    const token = auth.split(" ")[1];
    try {
      jwt.verify(token, "Now i am signed in");
      const user = jwt.decode(token);
      res.status(200).json({ user });
    } catch (error) {
      res.status(401).send({ error: "Please provide a valid Token" });
    }
  } else {
    res.status(401).send({ error: "Please provide a Token" });
  }
});

module.exports = router;

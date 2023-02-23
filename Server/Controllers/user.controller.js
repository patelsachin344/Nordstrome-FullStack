const User = require("../Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  if (user.password) {
    delete user.password;
  }
  return jwt.sign(user, "now i am signed in");
};

const registerUser = async (body) => {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(body.password, salt);

  const user = await User.create({ ...body, password: hashpassword });
  return user;
};

const loginUser = async (body) => {
  let { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    return { error: "User not found" };
  }
  let unhashpassword = await bcrypt.compare(password, user.password);
  if (!unhashpassword) {
    return { error: "Password not matched" };
  }
  const token = generateToken(user);
  return token;
};

module.exports = { registerUser, loginUser };

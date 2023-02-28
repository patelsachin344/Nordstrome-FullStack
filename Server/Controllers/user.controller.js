const User = require("../Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const generateToken = (user) => {
  if (user.password) {
    delete user.password;
  }
  return jwt.sign(user, process.env.SECRET_KEY);
};

const registerUser = async (body) => {
  if (body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(body.password, salt);

    const user = await User.create({ ...body, password: hashpassword });
    return user;
  }
  throw new Error("Please Fill All Required Fields");
};

const loginUser = async (body) => {
  let { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    // return { error: "Wronge username or password" };
    throw new Error("Wronge username or password");
  }
  let unhashpassword = await bcrypt.compare(password, user.password);
  if (!unhashpassword) {
    // return { error: "Wronge username or password" };
    throw new Error("Wronge username or password");
  }
  const token = generateToken(user.toJSON());
  return token;
};

module.exports = { registerUser, loginUser };

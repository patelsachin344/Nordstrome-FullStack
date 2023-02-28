const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv").config();

const connect = () => {
  return new Promise((res, rej) => {
    mongoose.connect(`${process.env.DATABASE_URL}`, (err) => {
      if (err) {
        console.error("Error connecting to nordstromeData: " + err);
        rej();
      }
      console.log("Connected to nordstromeData");
      res();
    });
  });
};

module.exports = connect;

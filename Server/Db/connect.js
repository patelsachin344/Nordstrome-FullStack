const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv").config();

const connect = () => {
  return new Promise((res, rej) => {
    mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.jdy4bcc.mongodb.net/nordstromeData?retryWrites=true&w=majority`,
      (err) => {
        if (err) {
          console.error("Error connecting to nordstromeData: " + err);
          rej();
        }
        console.log("Connected to nordstromeData");
        res();
      }
    );
  });
};

module.exports = connect;

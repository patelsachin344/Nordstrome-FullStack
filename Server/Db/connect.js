const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connect = () => {
  return new Promise((res, rej) => {
    mongoose.connect("mongodb://127.0.0.1:27017/nordstromeData", (err) => {
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

const express = require("express");
const fs = require("fs");

const cors = require("cors");
const connect = require("./Db/connect");
const productRouter = require("./Routes/product.route");
const userRouter = require("./Routes/user.route");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/products", productRouter);
app.use("/users", userRouter);

connect()
  .then(() => {
    app.listen(5000, () => {
      console.log("listening on 5000");
    });
  })
  .catch((err) => {
    console.error("Error listening" + err.message);
  });

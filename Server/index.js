const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connect = require("./Db/connect");
const productRouter = require("./Routes/product.route");
const userRouter = require("./Routes/user.route");
const cartRouter = require("./Routes/cart.route");
const laterRouter = require("./Routes/later.route");
const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan("common"));
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/laters", laterRouter);

connect()
  .then(() => {
    app.listen(5000, () => {
      console.log("listening on 5000");
    });
  })
  .catch((err) => {
    console.error("Error listening" + err.message);
  });

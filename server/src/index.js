const express = require("express");
const dotenv = require("dotenv");
const config = require("./config/config");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

dotenv.config();

/**
 * getting the bidding controller and giving it the server
 */
const BiddingController = require("./controllers/bidding");

/**
 * route import
 */
const userRouter = require("./routes/user");
const shopRouter = require("./routes/shop");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const auctionRouter = require("./routes/auction");

const app = express();

/**
 * Connection to the database
 */
mongoose
  .connect(config.databaseString, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database successfully");
  });
/**
 * Middleware
 */
if (config.env === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

/**
 * Route Middleware
 */
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/shops/", shopRouter);
app.use("/api/v1/products/", productRouter);
app.use("/api/v1/orders/", orderRouter);
app.use("/api/v1/auctions/", auctionRouter);

app.use("*", (req, res, next) => {
  res.status(400).json({
    status: "error",
    message: `The requested url ${req.originalUrl} does not exist`,
  });
});

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT} successfully`);
});

BiddingController(server);

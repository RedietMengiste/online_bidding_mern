const express = require("express");
const dotenv = require("dotenv");
const config = require("./config/config");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

/**
 * route import
 */
const userRouter = require("./routes/user");
const shopRouter = require("./routes/shop");

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

app.use("*", (req, res, next) => {
  res.status(400).json({
    status: "error",
    message: `The requested url ${req.originalUrl} does not exist`,
  });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT} successfully`);
});

const Order = require("../models/order");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/products"));
  },
  filename: function (req, file, cb) {
    cb(null, `product-${Date.now()}-image${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
});

exports.uploadImage = upload.single("image");

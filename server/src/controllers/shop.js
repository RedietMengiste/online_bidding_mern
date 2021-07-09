const Shop = require("../models/shop");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/shop"));
  },
  filename: function (req, file, cb) {
    cb(null, `shop-${Date.now()}-image${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
});

exports.uploadImage = upload.single("image");

exports.getAllShops = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const result = await Shop.paginate(
      {},
      {
        page,
        limit,
        sort: "-createdAt",
      }
    );
  } catch (err) {}
};

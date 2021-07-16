const Shop = require("../models/shop");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/shops"));
  },
  filename: function (req, file, cb) {
    cb(null, `shop-${Date.now()}-image${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
});

exports.uploadImage = upload.single("image");

exports.createShop = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const shop = await Shop.create({
      ...req.body,
      image: req.file.filename,
      owner: req.user._id,
    });

    res.status(201).json({
      status: "success",
      shop,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getShop = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const shop = await Shop.findById(req.params.shopId)
      .populate("owner", "_id firstName lastName")
      .exec();
    if (!shop) {
      res.status(400).json({
        status: "error",
        message: "Shop with this ID does not exist",
      });
    }

    req.shop = shop;
    res.status(200).json({
      status: "success",
      shop,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateShop = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const shop = await Shop.findByIdAndUpdate(req.params.shopId, req.body, {
      new: true,
      populate: "owner",
    });

    if (!shop) {
      res.status(404).json({
        status: "error",
        message: "Shop with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      shop,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteShop = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const shop = await Shop.findByIdAndDelete(req.params.shopId);
    if (!shop) {
      res.status(404).json({
        status: "error",
        message: "Shop with this ID does not exist",
      });
    }
    res.status(204).json({
      status: "success",
      shop: null,
    });
  } catch (err) {
    //TODO
  }
};

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
        populate:"owner",
        page,
        limit,
        sort: "-createdAt",
      }
    );

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {}
};

exports.getShopByOwner = async (req, res, next) => {
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
      {
        owner: req.user._id,
      },
      { populate:"owner",page, limit, sort: "-createdAt" }
    );

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.isOwner = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.shopId);

    if (!shop) {
      return res.status(404).json({
        status: "error",
        message: "Shop with this ID does not exist",
      });
    }

    const isOwner = await shop.isOwner(shop, req.user);
    if (!isOwner) {
      return res.status("403").json({
        status: "error",
        message: "User is not authorized",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

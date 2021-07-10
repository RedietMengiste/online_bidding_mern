const Product = require("../models/product");
const Shop = require("../models/shop");
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

exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const product = await Product.create({
      ...req.body,
      image: req.file.filename,
      shop: req.params.id,
    });

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const product = await Product.findById(req.params.productId).populate(
      "shop"
    );

    if (!product) {
      res.status(404).json({
        status: "error",
        message: "Product with this ID does not exist",
      });
    }
    req.product = product;
    const shop = await Shop.findById(product.shop).populate(
      "owner _id firstName lastName"
    );

    res.status(200).json({
      status: "success",
      product,
      owner: shop.owner,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
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
    const result = await Product.paginate(
      {},
      {
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

exports.updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
        populate: "shop",
      }
    );

    if (!product) {
      res.status(404).json({
        status: "error",
        message: "Product with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {}
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      res.status(404).json({
        status: "error",
        message: "Product with this ID does not exist",
      });
    }
    res.status(204).json({
      status: "success",
      product: null,
    });
  } catch (error) {}
};

exports.getShopAllProducts = async (req, res, next) => {
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

    const result = await Product.paginate(
      { shop: req.params.shopId },
      { page, limit, sort: "-createdAt" }
    );
    //   .populate("shop", "_id name")
    //   .select("-image");
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getLatestProducts = async (req, res, next) => {
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

    const result = await Product.paginate(
      {},
      { page, limit, sort: "-createdAt" }
    );
    //   .populate("shop", "_id name")
    //   .select("-image");
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    //console.log(error);
  }
};

exports.getRelatedProducts = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;

    const product = await Product.findById(req.params.productId).populate(
      "shop"
    );

    if (!product) {
      res.status(404).json({
        status: "error",
        message: "Product with this ID does not exist",
      });
    }

    const result = await Product.paginate(
      {
        _id: {
          $ne: req.params.productId,
        },
        category: product.category,
      },
      { page, limit, sort: "-createdAt" }
    );
    //   .populate("shop", "_id name")
    //   .select("-image");
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCategoriesList = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const result = await Product.distinct("category", {});

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.search)
      query.name = { $regex: req.query.search, $options: "i" };
    if (req.query.category && req.query.category != "All")
      query.category = req.query.category;

    const result = await Product.find(query)
      .populate("shop", "_id name")
      .select("-image")
      .exec();

    res.status(200).json({
      status: "success",
      result,
    });

    //const regex = new RegExp(req.query.search);
  } catch (error) {}
};

exports.decreaseProductQuantity = async (req, res, next) => {
  try {
    let bulkOps = req.body.order.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.quantity } },
        },
      };
    });

    try {
      await Product.bulkWrite(bulkOps, {});
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Could not update/decrease product quantity",
      });
    }

    next();
  } catch (error) {}
};

exports.increaseProductQuantity = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(
      req.product._id,
      { $inc: { quantity: req.body.quantity } },
      { new: true }
    ).exec();
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "could not increase product quantity",
    });
  }
};

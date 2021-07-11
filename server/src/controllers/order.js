const { Order, CartItem } = require("../models/order");
const { validationResult } = require("express-validator");

exports.createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    console.log(req.body.order);
    const order = await Order.create({
      ...req.body.order,
      user: req.user._id,
      customer_name: `${req.user.firstName} ${req.user.lastName}`,
      customer_email: req.user.email,
    });

    res.status(200).json({
      status: "success",
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrdersByShop = async (req, res, next) => {
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

    const result = await Order.paginate(
      { "products.shop": req.params.shopId },
      { page, limit, sort: "-createdAt" }
    );
    // .populate({ path: "products.product", select: "_id name price" });

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const order = await Order.findByIdAndUpdate(
      { "products._id": req.body.cartItemId },
      {
        "products.$.status": req.body.status,
      }
    );

    if (!order) {
      res.status(404).json({
        status: "error",
        message: "Order with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getStatusValues = async (req, res, next) => {
  try {
    const result = await CartItem.schema.path("status").enumValues;
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const order = await Order.findById(req.params.orderId)
      .populate("products.product", "name price")
      .populate("products.shop", "name")
      .exec();

    if (!order) {
      res.status(404).json({
        status: "error",
        message: "Order with this ID does not exist",
      });
    }
    req.order = order;
    // const shop = await Shop.findById(product.shop).populate(
    //   "owner _id firstName lastName"
    // );

    res.status(200).json({
      status: "success",
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrdersByUserId = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await Order.paginate(
      { user: req.user._id },
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
  } catch (error) {
    console.log(error);
  }
};

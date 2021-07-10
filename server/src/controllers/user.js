const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("../config/config");

/**
 *
 * @param {ObjectId} id
 * @returns
 */
const getToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (
      !user ||
      !(await user.verifyPassword(req.body.password, user.password))
    ) {
      res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const token = getToken(user._id);
    res.status(201).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    //TODO
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const user = await User.create(req.body);
    const token = getToken(user._id);
    res.status(201).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    //TODO: Handle Error
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.searchUser = async (req, res, next) => {
  try {
    const regex = new RegExp(req.query.q);
    const users = await User.find({
      email: {
        $regex: regex,
        $options: "si",
      },
    });
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    //TODO: Handle Error
  }
};

exports.findUserByID = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status("400").json({
        error: "user not found",
      });
    }
    req.profile = user;
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

exports.updateUserByID = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      populate: "owner",
    });
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User with this ID does not exist",
      });
    }
    req.user = user;
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.isSeller = (req, res, next) => {
  const isSeller = req.user && req.user.seller;
  if (!isSeller) {
    return res.status("403").json({
      error: "User is not a seller",
    });
  }
  next();
};

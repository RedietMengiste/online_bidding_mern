const { body, param } = require("express-validator");
const mongoose = require("mongoose");

exports.validate = (type) => {
  switch (type) {
    case "GET":
      return [
        param("orderId")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid order ID"),
      ];
    case "CREATE":
      return [];

    case "UPDATE":
      return [
        param("orderId")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid order ID"),

        body("customer_name")
          .optional()
          .not()
          .isEmpty()
          .withMessage("customer name is required"),
        body("customer_email")
          .optional()
          .not()
          .isEmpty()
          .withMessage("customer email is required"),
      ];

    case "DELETE":
      return [
        param("orderId")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid order ID"),
      ];
    default:
      return [];
  }
};

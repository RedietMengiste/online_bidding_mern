const { body } = require("express-validator");
const mongoose = require("mongoose");

exports.validate = (type) => {
  switch (type) {
    case "GET":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid order ID"),
      ];
    case "CREATE":
      return [
        body("customer_name")
          .not()
          .isEmpty()
          .withMessage("customer name is required"),
        body("customer_email")
          .not()
          .isEmpty()
          .withMessage("customer email is required"),
      ];

    case "UPDATE":
      return [
        param("id")
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
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid order ID"),
      ];
    default:
      return [];
  }
};

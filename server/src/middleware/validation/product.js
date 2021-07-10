const { body, param } = require("express-validator");
const mongoose = require("mongoose");

exports.validate = (type) => {
  switch (type) {
    case "GET":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid product ID"),
      ];
    case "CREATE":
      return [
        body("name").not().isEmpty().withMessage("Product name is required"),
        body("quantity")
          .not()
          .isEmpty()
          .withMessage("Product Quantity is required"),
        body("price").not().isEmpty().withMessage("Product price is required"),
      ];

    case "UPDATE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid Product ID"),

        body("name")
          .optional()
          .not()
          .isEmpty()
          .withMessage("Product name is required"),
        body("quantity")
          .optional()
          .not()
          .isEmpty()
          .withMessage("Product Quantity is required"),
        body("price")
          .optional()
          .not()
          .isEmpty()
          .withMessage("Product price is required"),
      ];

    case "DELETE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid product ID"),
      ];
    default:
      return [];
  }
};

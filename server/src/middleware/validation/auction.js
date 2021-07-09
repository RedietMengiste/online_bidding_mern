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
          .withMessage("Invalid auction ID"),
      ];
    case "CREATE":
      return [
        body("itemName").not().isEmpty().withMessage("item name is required"),
        body("bidEnd").not().isEmpty().withMessage("bid end is required"),
      ];

    case "UPDATE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid auction ID"),

        body("itemName")
          .optional()
          .not()
          .isEmpty()
          .withMessage("item name is required"),
        body("bidEnd")
          .optional()
          .not()
          .isEmpty()
          .withMessage("bid end is required"),
      ];

    case "DELETE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid auction ID"),
      ];
    default:
      return [];
  }
};

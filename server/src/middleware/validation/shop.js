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
          .withMessage("Invalid shop ID"),
      ];
    case "CREATE":
      return [
        body("name").not().isEmpty().withMessage("Shop Name is required"),
        body("description")
          .not()
          .isEmpty()
          .withMessage("Shop description is required"),
      ];

    case "UPDATE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid Shop ID"),
        body("name")
          .optional()
          .not()
          .isEmpty()
          .withMessage("Shop Name is required"),
        body("description")
          .optional()
          .not()
          .isEmpty()
          .withMessage("Shop description is required"),
      ];

    case "DELETE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid shop ID"),
      ];

    default:
      return [];
  }
};

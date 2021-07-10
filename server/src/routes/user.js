const express = require("express");
const userController = require("../controllers/user");
const userValidation = require("../middleware/validation/user");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

/**
 * Routes for handling
 *  - User login
 *  - User sign up
 *  - User search
 */

router.post("/login", userValidation.validate("LOGIN"), userController.login);

router.post(
  "/signup",
  userValidation.validate("SIGNUP"),
  userController.signup
);

router
  .route("/:userId")
  .get(verifyUser, userController.findUserByID)
  .put(verifyUser, userController.updateUserByID);

router.get("/search", verifyUser, userController.searchUser);

module.exports = router;

const express = require("express");
const { verifyUser } = require("../middleware/auth");
const shopValidation = require("../middleware/validation/shop");
const shopController = require("../controllers/shop");
const userController = require("../controllers/user");
const router = express.Router();

router.route("/").get(shopController.getAllShops);
router
  .route("/:id")
  .get(shopValidation.validate("GET"), shopController.getShop)
  .put(
    verifyUser,
    shopController.isOwner,
    shopController.uploadImage,
    shopValidation.validate("UPDATE"),
    shopController.updateShop
  )
  .delete(
    verifyUser,
    shopController.isOwner,
    shopValidation.validate("DELETE"),
    shopController.deleteShop
  );

router
  .route("/by/:id")
  .post(
    verifyUser,
    userController.isSeller,
    shopController.uploadImage,
    shopValidation.validate("CREATE"),
    shopController.createShop
  )
  .get(
    verifyUser,
    //shopValidation.validate("GET"),
    shopController.getShopByOwner
  );

module.exports = router;

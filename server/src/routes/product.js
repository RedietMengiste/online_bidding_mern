const express = require("express");
const { verifyUser } = require("../middleware/auth");
const productValidation = require("../middleware/validation/product");
const productController = require("../controllers/product");
const shopController = require("../controllers/shop");
const userController = require("../controllers/user");

const router = express.Router();

//shopid
router
  .route("/by/:shopId")
  .post(
    verifyUser,
    shopController.isOwner,
    productController.uploadImage,
    productValidation.validate("CREATE"),
    productController.createProduct
  )
  .get(productController.getShopAllProducts);

router
  .route("/:productId")
  .get(productValidation.validate("GET"), productController.getProductById);

//shopId/productId
router
  .route("/:shopId/:productId")
  .put(
    verifyUser,
    shopController.isOwner,
    productController.uploadImage,
    productValidation.validate("UPDATE"),
    productController.updateProduct
  )
  .delete(
    verifyUser,
    shopController.isOwner,
    productValidation.validate("DELETE"),
    productController.deleteProduct
  );

//   latest
router.route("/any/latest").get(productController.getLatestProducts);

// related
//id=productid
router.route("/related/:productId").get(productController.getRelatedProducts);

// all
router.route("/").get(productController.getAllProducts);

//categories
router.route("/any/categories").get(productController.getCategoriesList);

module.exports = router;

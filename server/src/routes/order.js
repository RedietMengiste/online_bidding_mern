const express = require("express");
const { verifyUser } = require("../middleware/auth");
const orderValidation = require("../middleware/validation/order");
const orderController = require("../controllers/order");
const shopController = require("../controllers/shop");
const productController = require("../controllers/product");
const userController = require("../controllers/user");

const router = express.Router();

//create order by user
router
  .route("/by/:userId")
  .post(
    verifyUser,
    orderValidation.validate("CREATE"),
    productController.decreaseProductQuantity,
    orderController.createOrder
  );

//   get orders by shop
router
  .route("/shop/:shopId")
  .get(verifyUser, shopController.isOwner, orderController.getOrdersByShop);

//   update orders
router
  .route("/:shopId/cancel/:productId")
  .put(
    verifyUser,
    shopController.isOwner,
    orderValidation.validate("UPDATE"),
    productController.increaseProductQuantity,
    orderController.updateOrder
  );

// router
//   .route("/:orderId/charge/:userId/:productId")
//   .put(
//     verifyUser,
//     shopController.isOwner,
//     productController.increaseProductQuantity,
//     orderController.updateOrder
//   );

router.route("/status/:shopId").put(
  verifyUser,
  shopController.isOwner,
  //orderValidation.validate("UPDATE"),
  orderController.updateOrder
);

//get order by id
router.route("/:orderId").get(orderController.getOrderById);

//get order by user
router
  .route("/user/:userId")
  .get(verifyUser, orderController.getOrdersByUserId);

router.route("/any/statusValues").get(orderController.getStatusValues);

// router.param("userId", userController.findUserByID);
// router.param("shopId", shopController.getShop);
// router.param("productId", productController.getProductById);
// router.param("orderId", orderController.getOrderById);
module.exports = router;
